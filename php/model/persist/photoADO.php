<?php

require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/photo.class.php";

class PhotoADO implements EntityInterfaceADO{

	private static $tableName = "photo";
	private static $colId = "photo_id";
	private static $colUserId = "user_id";
	private static $colPhotoName = "photo_name";
	private static $colPhotoPath = "photo_path";
	private static $colPhotoLocation = "photo_location";
	private static $colPhotoType = "photo_type";
	private static $colPhotoTime = "photo_time";


	/**
	 * @param  $res the query to get values
	 * @return an array of the result transformed in an object
	 */
	public static function fromResultSetList($res){
		$list = array();
		$i = 0;

		/*while(($row = $res->fetch_array(MYSQLI_BOTH)) != NULL){*/
			foreach($res as $final){
				$ent = PhotoADO::fromResultSet($final);
				$list[$i] = $ent;
				$i++;
			}
			return $list;
	}

	/**
	 * [fromResultSet description]
	 * @param  [type] $res [description]
	 * @return [type]      [description]
	 */
	public static function fromResultSet($res){

		//get values from query
		$id = $res[PhotoADO::$colId];
		$user_id = $res[PhotoADO::$colUserId];
		$photo_name = $res[PhotoADO::$colPhotoName];
		$photo_path = $res[PhotoADO::$colPhotoPath];
		$photo_location = $res[PhotoADO::$colPhotoLocation];
		$photo_type = $res[PhotoADO::$colPhotoType];
		$photo_time = $res[PhotoADO::$colPhotoTime];

		//object constructor
		$ent = new PhotoClass();
		$ent->setId($id);
		$ent->setUser_id($user_id);
		$ent->setPhoto_name($photo_name);
		$ent->setPhoto_path($photo_path);
		$ent->setPhoto_location($photo_location);
		$ent->setPhoto_type($photo_type);
		$ent->setPhoto_time($photo_time);

    	return $ent;
	}

	/**
	 * [insert description]
	 * @param  [type] $new [description]
	 * @return [type]       [description]
	 */
	public function create($photo){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = sprintf("INSERT INTO %s(`%s`, `%s`, `%s`, `%s`, `%s`) VALUES(?, ?, ?, ?, ?)", PhotoADO::$tableName, PhotoADO::$colUserId, PhotoADO::$colPhotoName, PhotoADO::$colPhotoPath, PhotoADO::$colPhotoLocation, PhotoADO::$colPhotoType);

		$values = [$photo->getUser_id(), $photo->getPhoto_name(), $photo->getPhoto_path(), $photo->getPhoto_location(), $photo->getPhoto_type()];

		$fin = $conn->execution($toRes, $values);

		return $photo->getId();
	}


	/**
	 * [update description]
	 * @param  [type] $new [description]
	 * @return [type]      [description]
	 */
	public function update($new){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = sprintf("UPDATE FROM `%s` SET %s = `?`, %s = `?`, %s = `?` WHERE %s = `?`", NewsADO::$tableName, NewsADO::$colTitle, NewsADO::$colDescription, NewsADO::$colPhotoNewPath);

		$values = [$new->getTitle(), $new->getDescription(), $new->getPhotoNewPath()];

		$conn->execution($toRes, $values);
	}


	/**
	 * [findByQuery description]
	 * @param  [type] $state [description]
	 * @param  [type] $query [description]
	 * @return [type]        [description]
	 */
	public static function findByQuery($state, $query){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in photoADO: ".$e->getMessage());
			die();
		}

		$res = $conn->execution($state, $query);

		return PhotoADO::fromResultSetList($res);
	}

	/**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll($photo) {
			$cons = sprintf("SELECT * FROM `%s` WHERE %s = ?", PhotoADO::$tableName, PhotoADO::$colUserId);
			$values = [$photo->getUser_id()];
			return PhotoADO::findByQuery( $cons, $values );
    }

		public static function findAllByPhotoId($photo) {
			$cons = sprintf("SELECT * FROM `%s` WHERE %s = ?", PhotoADO::$tableName, PhotoADO::$colId);
			$values = [$photo->getId()];
			return PhotoADO::findByQuery( $cons, $values );
    }

		public static function removePhoto($photo){
			//connect to db
			try{
				$conn = DBConnect::getInstance();
			}catch(PDOException $e){
				echo "Error executing query";
				error_log("Error executing query in photoADO: ".$e->getMessage());
				die();
			}

			$cons = sprintf("DELETE FROM %s WHERE %s = ?", PhotoADO::$tableName, PhotoADO::$colId);
			$values = [$photo->getId()];

			$conn->execution($cons, $values);
		}

		public static function getValues(){
			//connect to db
			try{
				$conn = DBConnect::getInstance();
			}catch(PDOException $e){
				echo "Error executing query";
				error_log("Error executing query in photoADO: ".$e->getMessage());
				die();
			}

			$cons = "SELECT MAX(photo_id) FROM `photo`";
			$query = $conn->execution($cons, []);

			$result = $query->fetch();

			return $result;
		}
}


?>
