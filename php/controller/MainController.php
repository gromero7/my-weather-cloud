<?php

require_once "UserController.php";
require_once "WeatherstController.php";
require_once "NewController.php";
require_once "PhotoController.php";

header('Access-Control-Allow-Origin: *');

function is_session_started(){

	if(php_sapi_name() != "cli"){
		if(version_compare(phpversion(), "5.4.0", ">=")){

			return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
		}
		else{

			return session_id() === "" ? FALSE:TRUE;
		}
	}
	return FALSE;
}

if(is_session_started() === FALSE){
	session_start();
}

if(isset($_REQUEST["controllerType"])){

	$action = (int) $_REQUEST["controllerType"];

	switch ($action) {
		case 0:
			$userController = new UserController($_REQUEST['action'], $_REQUEST['jsonData']);
			$outPutData = $userController->doAction();
			break;
		case 1:
			$weatherstController = new WeatherstController($_REQUEST['action'], $_REQUEST['jsonData']);
			$outPutData = $weatherstController->doAction();
			break;

		case 2:
			$newController = new NewController($_REQUEST['action'], $_REQUEST['jsonData']);
			$outPutData = $newController->doAction();
			break;

		case 3:
			$photoController = new PhotoController($_REQUEST['action'], $_REQUEST['jsonData']);
			$outPutData = $photoController->doAction();
			break;

		default:
			$errors = array();
			$outPutData[0] = false;
			$errors[] = "There has been an error.";
			$outPutData[] = $errors;
			error_log("MainController: action not correct, value: ".$_REQUEST["controllerType"]);
			break;
	}
}
else{
	$errors = array();
	$outPutData[0] = false;
	$errors[] = "There has been an error.";
	error_log("MainController: action doesnt exist");
	$outPutData[] = $errors;
}

echo json_encode($outPutData);
?>