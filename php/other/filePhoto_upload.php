<?php

require_once "../model/persist/photoADO.php";
require_once "../model/photo.class.php";

    $name = $_POST['name'];
    $user_id = $_POST['user_id'];
    $photoName = $_POST['photoname'];
    $location = $_POST['location'];
    $date = $_POST['date'];
    $type = $_POST['type'];
    print_r($_FILES);

    $last_id = PhotoADO::getValues();

    if(!file_exists('../../images/profile/'.$user_id)){
      mkdir('../../images/profile/'.$user_id, 0777, true);
      $target_dir = "../../images/profile/".$user_id."/";
      $real_dir = "images/profile/".$user_id."/".$last_id[0]."-".basename($_FILES["file"]["name"]);
    }
    else{
      $target_dir = "../../images/profile/".$user_id."/";
      $real_dir ="images/profile/".$user_id."/".$last_id[0]."-".basename($_FILES["file"]["name"]);
    }

    $target_file = $target_dir . $last_id[0]."-".basename($_FILES["file"]["name"]);

    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

    $photo = new PhotoClass();
    $photo->setAll($user_id, $photoName, $real_dir, $location, $type, "");

    $photo->setId(PhotoADO::create($photo));

?>
