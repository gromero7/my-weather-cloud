<?php

require_once "../model/persist/newsADO.php";
require_once "../model/news.class.php";
require_once "../model/persist/userADO.php";
require_once "../model/user.class.php";
require "../../libs/PHPMailer-master/PHPMailerAutoload.php";

    $id = $_POST['user_id']; //user id
    $title = $_POST['photoname']; // title of news
    $description = $_POST['location']; //description of news
    $font = $_POST['name']; //font of news
    print_r($_FILES);

    $target_dir = "../../images/news/";
    $real_dir ="images/news/".$id."-".basename($_FILES["file"]["name"]);

    $target_file = $target_dir .$id."-".basename($_FILES["file"]["name"]);

    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

    $new = new NewsClass();
    $new->setAll($id, $title, $description, $real_dir, $font, "");

    $new->_setId(NewsADO::create($new));

    $user = new UserClass();
    $result = UserADO::getNewsletters();

    for($i = 0; $i < count($result); $i++){
      $name = $result[$i]["name"];
      $email = $result[$i]["email"];

      $mail = new PHPMailer;

      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = 'smtp.gmail.com';  												// Specify main and backup SMTP servers
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = 'myweathercloudstaff@gmail.com';    // SMTP username
      $mail->Password = 'weatheradministrator7';            // SMTP password
      $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
      $mail->Port = 465;                                    // TCP port to connect to

      $mail->setFrom('myweathercloudstaff@gmail.com', 'My Weather Cloud Helper');
      $mail->addAddress($email, $name);     // Add a recipient

      $mail->addAttachment('../../assets/banner_mwc.png');    // Optional name
      $mail->isHTML(true);                                  // Set email format to HTML

      $mail->Subject = 'Recovery password';
      $mail->Body    = 'Hey, '.$name.'. There is new news at My weather cloud website. Check out at: http://www.provenapps.cat/~daw16-18/ <br><br> Have a nice day!';
      $mail->AltBody = 'Hey, '.$name.'. There is new news at My weather cloud website. Check out at: http://www.provenapps.cat/~daw16-18/ . Have a nice day!';

      if(!$mail->send()) {
          $errors = 'Message could not be sent.';
          echo 'Mailer Error: ' . $mail->ErrorInfo;
      } else {
          $success = 'Message has been sent';
      }
    }

?>
