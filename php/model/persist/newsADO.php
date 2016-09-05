<?php

require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/photo.class.php";

class NewsADO implements EntityInterfaceADO{

	private static $tableName = "new";
	private static $colId = "new_id";
	private static $colTitle = "title";
	private static $colDescription = "description";
	private static $colPhotoNewPath = "photo_new_path";
	private static $colFont = "font";


	/**
	 * @param  $res the query to get values
	 * @return an array of the result transformed in an object
	 */
	public static function fromResultSetList($res){
		$list = array();
		$i = 0;

		/*while(($row = $res->fetch_array(MYSQLI_BOTH)) != NULL){*/
			foreach($res as $final){
				$ent = NewsADO::fromResultSet($final);
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
		$id = $res[NewsADO::$colId];
		$title = $res[NewsADO::$colTitle];
		$description = $res[NewsADO::$colDescription];
		$photo_new_path = $res[NewsADO::$colPhotoNewPath];
		$font = $res[NewsADO::$colFont];


		//object constructor
		$ent = new NewsClass();
		$ent->_setId($id);
    	$ent->_setTitle($title);
    	$ent->_setDescription($description);
    	$ent->_setPhotoNewPath($photo_new_path);
			$ent->_setFont($font);

    	return $ent;
	}


	/**
	 * [creat new news]
	 * @param  [object] $new [news object]
	 */
	public function create($new){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = "INSERT INTO ".NewsADO::$tableName. "(`title`, `description`, `photo_new_path`, `font`) VALUES(?, ?, ?, ?)";
		$values = [$new->getTitle(), $new->getDescription(), $new->getPhotoNewPath(), $new->getFont()];

		$fin = $conn->execution($toRes, $values);

		return $new->getId();
	}

	/**
	 * [uppdate the news]
	 * @param  [type] $photo [description]
	 * @return [type]        [description]
	 */
	public function update($photo){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = sprintf("UPDATE FROM `%s` SET %s = `?`, %s = `?`, %s = `?` WHERE %s = `?`", NewsADO::$tableName, NewsADO::$colTitle, NewsADO::$colDescription, NewsADO::$colPhotoNewPath);

		$values = [$photo->getTitle(), $photo->getDescription(), $photo->getPhotoNewPath()];

		$conn->execution($toRes, $values);
	}

	public static function findByQuery($state, $query){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in newADO: ".$e->getMessage());
			die();
		}

		$res = $conn->execution($state, $query);

		return NewsADO::fromResultSetList($res);
	}

	public static function findAllByNewId($new){
		$cons = sprintf("SELECT * FROM `%s` WHERE %s = ?", NewsADO::$tableName, NewsADO::$colId);
		$values = [intval($new->getId())];
		return NewsADO::findByQuery( $cons, $values );
	}

	public static function removeNew($new){
		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in photoADO: ".$e->getMessage());
			die();
		}

		$cons = sprintf("DELETE FROM %s WHERE %s = ?", NewsADO::$tableName, NewsADO::$colId);
		$values = [$new->getId()];

		$conn->execution($cons, $values);
	}

	/**
	 * findAll()
	 * It runs a query and returns an object array
	 * @param none
	 * @return object with the query results
    */
    public static function findAll() {
    	$cons = "select * from `".NewsADO::$tableName."`";
			return NewsADO::findByQuery( $cons, [] );
    }

}


?>
