<?php

require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/weatherst.class.php";


class WeatherstADO implements EntityInterfaceADO{

	private static $tableName = "weather_station";
	private static $colId = "weather_id";
	private static $colUserId = "user_id";
	private static $colLogPath = "log_path";

	/**
	 * @param  $res the query to get values
	 * @return an array of the result transformed in an object
	 */
	public static function fromResultSetList($res){
		$list = array();
		$i = 0;

		/*while(($row = $res->fetch_array(MYSQLI_BOTH)) != NULL){*/
			foreach($res as $final){
				$ent = WeatherstADO::fromResultSet($final);
				$list[$i] = $ent;
				$i++;
			}
			return $list;
	}

	/**
	 * [querySet description]
	 * @param  [type] $res [description]
	 * @return [type]      [description]
	 */
	public static function fromResultSet($res){

		$id = $res[WeatherstADO::$colId];
		$userid = $res[WeatherstADO::$colUserId];
		$logPath = $res[WeatherstADO::$colLogPath];

		$ent = new WeatherstClass();
		$ent->_setId($id);
		$ent->_setUserId($userid);
		$ent->_setLogPath($logPath);

    	return $ent;
	}


	public function create($station){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = sprintf("INSERT INTO %s (`%s`, `%s`) VALUES(?, ?);", WeatherstADO::$tableName, WeatherstADO::$colUserId, WeatherstADO::$colLogPath);
		$values = [$station->getUserid(), $station->getLogPath()];

		$fin = $conn->execution($toRes, $values);

		return $station->getId();
	}

	public static function findByQuery($state, $query){

		//connect to DB
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in UserADO: ".$e->getMessage());
			die();
		}

		$res = $conn->execution($state, $query);

		return WeatherstADO::fromResultSetList($res);
	}

	public static function findById($weather){

		$cons = "SELECT * FROM `".WeatherstADO::$tableName."` WHERE ".WeatherstADO::$colUserId." = ?";
		$res = [$weather->getUserId()];

		return WeatherstADO::findByQuery($cons, $res);
	}
}

?>