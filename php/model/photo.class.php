<?php

require_once "EntityInterface.php";

class PhotoClass implements EntityInterface{

	private $id;
	private $user_id;
	private $photo_name;
	private $photo_path;
	private $photo_location;
	private $photo_type;
	private $photo_time;

	private static $tableName = "photo";
	private static $colId = "photo_id";
	private static $colUserId = "user_id";
	private static $colPhotoName = "photo_name";
	private static $colPhotoPath = "photo_path";
	private static $colPhotoLocation = "photo_location";
	private static $colPhotoType = "photo_type";
	private static $colPhotoTime = "photo_time";


	function __construct(){}


	function setId($id) { $this->id = $id; }
	function getId() { return $this->id; }
	function setUser_id($user_id) { $this->user_id = $user_id; }
	function getUser_id() { return $this->user_id; }
	function setPhoto_name($photo_name) { $this->photo_name = $photo_name; }
	function getPhoto_name() { return $this->photo_name; }
	function setPhoto_path($photo_path) { $this->photo_path = $photo_path; }
	function getPhoto_path() { return $this->photo_path; }
	function setPhoto_location($photo_location) { $this->photo_location = $photo_location; }
	function getPhoto_location() { return $this->photo_location; }
	function setPhoto_type($photo_type) { $this->photo_type = $photo_type; }
	function getPhoto_type() { return $this->photo_type; }
	function setPhoto_time($photo_time) { $this->photo_time = $photo_time; }
	function getPhoto_time() { return $this->photo_time; }


	/**
	 * [getAll get all the parameters of photo class]
	 * @return $data [array] [returns all parameters of photo class]
	 */
	public function getAll(){
		$data = array(
			"photo_id"    		=> $this->id,
			"user_id"			=> $this->user_id,
			"photo_name"		=> $this->photo_name,
			"photo_path"		=> $this->photo_path,
			"photo_location"	=> $this->photo_location,
			"photo_type"		=> $this->photo_type,
			"photo_time"		=> $this->photo_time
			);

		return $data;
	}

	public function setAll($user_id, $photo_name, $photo_path, $photo_location, $photo_type, $photo_time){
		$this->setUser_id($user_id);
		$this->setPhoto_name($photo_name);
		$this->setPhoto_path($photo_path);
		$this->setPhoto_location($photo_location);
		$this->setPhoto_type($photo_type);
		$this->setPhoto_time($photo_time);
	}

}



?>
