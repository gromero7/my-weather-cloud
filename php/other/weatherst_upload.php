<?php

require_once "../model/persist/weatherstADO.php";
require_once "../model/weatherst.class.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

    $id = $_POST['user_id'];
    print_r($_FILES);

    if(!file_exists('../../weatherStations/user-'.$id)){
      mkdir('../../weatherStations/user-'.$id, 0777, true);
      $target_dir = "../../weatherStations/user-".$id."/";
      $real_dir = "weatherStations/user-".$id."/".basename($_FILES["file"]["name"]);
    }
    else{
      $target_dir = "../../weatherStations/user-".$id."/";
      $real_dir ="weatherStations/user-".$id."/".basename($_FILES["file"]["name"]);
    }

    $target_file = $target_dir.basename($_FILES["file"]["name"]);

    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
    $data = file_get_contents('../../weatherStations/user-'.$id.'/realtime.txt'); //get data of realtime
    file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);

    /*$valuesP[] = explode(" ", $data);

    $Tmax = $valuesP[0][28];
    $Tmin = $valuesP[0][30];
    $PMax = $valuesP[0][36];
    $Pmin = $valuesP[0][38];
    $WGMax = $valuesP[0][34];

    //get the data of accumulation to check if is a different day or max and min values
    $acumOfFile = file_get_contents('../../weatherStations/user-'.$id.'/accum-realtime.txt');

    $date = date('d/m/Y', time()); //24/05/2016
    $accumData[] = explode("\n", $acumOfFile); //get the entire row

    foreach($accumData[0] as $key){
      $accumFinalData[] = explode(" ", $key);
    }

    $lines = file('../../weatherStations/user-'.$id.'/accum-realtime.txt');
    $last = sizeof($lines) -1;

    if($accumFinalData[$accumData.length][0] != $date){
      file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
    }
    else{
      if($accumFinalData[$accumData.length][28] < $Tmax){
        if($accumFinalData[$accumData.length][30] > $Tmin){
          if($accumFinalData[$accumData.length][34] > $WGMax){
            if($accumFinalData[$accumData.length][36] > $PMax){
              if($accumFinalData[$accumData.length][38] < $Pmin){
                unset($lines[$last]);
                file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
              }
              unset($lines[$last]);
              file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
            }
            unset($lines[$last]);
            file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
          }
          unset($lines[$last]);
          file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
        }
        unset($lines[$last]);
        file_put_contents($target_dir."accum-".basename($_FILES["file"]["name"]), $data, FILE_APPEND | LOCK_EX);
      }
    }*/


    $weather = new WeatherstClass();
    $weather->setAll($id, $real_dir);

    $weather->_setId(WeatherstADO::create($weather));

?>
