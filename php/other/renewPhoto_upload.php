<?php

require_once "../model/user.class.php";
require_once "../model/persist/userADO.php";

$object = $_POST['name'];
$user_id = $_POST['user_id'];
$type = $_POST['type'];
$values = explode(",",$object);
$x = intval($values[0]);
$y = intval($values[1]);
$w = intval($values[4]);
$h = intval($values[5]);
$targ_w = $targ_h = 600;

if(!file_exists('../../images/profile/photo/'.$user_id)){
  mkdir('../../images/profile/photo/'.$user_id, 0777);
  $target_dir = "../../images/profile/photo/".$user_id."/";
  $real_dir = "images/profile/photo/".$user_id."/".basename($_FILES["file"]["name"]);
}
else{
  $target_dir = "../../images/profile/photo/".$user_id."/";
  $real_dir ="images/profile/photo/".$user_id."/".basename($_FILES["file"]["name"]);
}

$target_file = $target_dir . basename($_FILES["file"]["name"]);

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

$src = $target_dir.basename($_FILES["file"]["name"]);

if($type == "image/jpeg"){

  header('Content-type: image/jpeg');
  $jpeg_quality = 85;
  $img_r = imagecreatefromjpeg($src);
  $dst_r = ImageCreateTrueColor( $targ_w, $targ_h );
  imagecopyresampled($dst_r,$img_r,0,0,$x,$y,$targ_w,$targ_h,$w,$h);

  imagejpeg($dst_r, $target_file, $jpeg_quality);
}
elseif($type == "image/png"){
  header("Content-type: image/png");
  $png_quality = 85;
  $cadena = $_GET['texto'];
  $im = imagecreatefrompng($src);
  $dst_r = ImageCreateTrueColor( $targ_w, $targ_h );
  imagecopyresampled($dst_r,$im,0,0,$x,$y,$targ_w,$targ_h,$w,$h);

  imagepng($dst_r, $target_file);
}

$image = new UserClass();
$image->_setId($user_id);
$image->_setAvatarPath($real_dir);

UserADO::insertProfileImage($image);

?>
