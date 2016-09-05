<?php


require_once "DBConnect.php";
require_once "EntityInterfaceADO.php";
require_once "../model/user.class.php";

/**
 *
 */
class UserADO implements EntityInterfaceADO{

	private static $tableName = "user";
	private static $colId = "user_id";
	private static $colName = "name";
	private static $colSurname = "surname";
	private static $colNickname = "nickname";
	private static $colLocation = "location";
	private static $colEmail = "email";
	private static $colBirthday = "birthday";
	private static $colPassword = "password";
	private static $colPrivileges = "privileges";
	private static $colNewsletter = "newsletter";
	private static $colAvatar_path = "avatar_path";

	/**
	 * @param  $res the query to get values
	 * @return an array of the result transformed in an object
	 */
	public static function fromResultSetList($res){
		$list = array();
		$i = 0;

		/*while(($row = $res->fetch_array(MYSQLI_BOTH)) != NULL){*/
			foreach($res as $final){
				$ent = UserADO::fromResultSet($final);
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

		//get values from query
		$id = $res[UserADO::$colId];
		$name = $res[UserADO::$colName];
		$surname = $res[UserADO::$colSurname];
		$nickname = $res[UserADO::$colNickname];
		$location = $res[UserADO::$colLocation];
		$email = $res[UserADO::$colEmail];
		$birthday = $res[UserADO::$colBirthday];
		$password = $res[UserADO::$colPassword];
		$privileges = $res[UserADO::$colPrivileges];
		$newsletter = $res[UserADO::$colNewsletter];
		$avatar_path = $res[UserADO::$colAvatar_path];

		//object constructor
		$ent = new UserClass();
		$ent->_setId($id);
    	$ent->_setName($name);
    	$ent->_setSurname($surname);
    	$ent->_setNickname($nickname);
    	$ent->_setLocation($location);
    	$ent->_setEmail($email);
    	$ent->_setBirthday($birthday);
    	$ent->_setPassword($password);
    	$ent->_setPrivileges($privileges);
    	$ent->_setNewsletter($newsletter);
    	$ent->_setAvatarPath($avatar_path);

    	return $ent;
	}

	/**
	 * [insert description]
	 * @param  [type] $user [description]
	 * @return [type]       [description]
	 */
	public function create($user){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$toRes = "INSERT INTO ".UserADO::$tableName. "(`name`, `surname`, `nickname`, `location`, `email`, `birthday`, `password`, `newsletter`) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
		$values = [$user->getName(), $user->getSurname(), $user->getNickname(), $user->getLocation(), $user->getEmail(), $user->getBirthday(), $user->getPassword(), $user->getNewsletter()];

		$fin = $conn->execution($toRes, $values);


		return $user->getId();
	}

	public function update($user){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}
		$toRes = sprintf("UPDATE `%s` SET %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?", UserADO::$tableName, UserADO::$colName, UserADO::$colSurname, UserADO::$colLocation, UserADO::$colEmail, UserADO::$colBirthday, UserADO::$colPassword, UserADO::$colNewsletter, UserADO::$colId);

		$values = [$user->getName(), $user->getSurname(), $user->getLocation(), $user->getEmail(), $user->getBirthday(), $user->getPassword(), $user->getNewsletter(), $user->getId()];
		$conn->execution($toRes, $values);
	}

	public static function findByQuery($state, $query){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in UserADO: ".$e->getMessage());
			die();
		}

		$res = $conn->execution($state, $query);

		return UserADO::fromResultSetList($res);
	}

	public static function findByNickAndPass( $user ) {
		$cons = "select * from `".UserADO::$tableName."` where ".UserADO::$colNickname." = ? and ".UserADO::$colPassword." = ?";
		$arrayValues = [$user->getNickname(),$user->getPassword()];

		return UserADO::findByQuery( $cons, $arrayValues );
    }

		public static function findByNick($user){
			$cons = "select * from `".UserADO::$tableName."` where ".UserADO::$colNickname." = ?";
			$arrayValues = [$user->getNickname()];

			return UserADO::findByQuery( $cons, $arrayValues );
		}

	public static function insertProfileImage($image){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in UserADO: ".$e->getMessage());
			die();
		}

		$cons = sprintf("UPDATE `%s` SET %s = ? WHERE %s = ?",UserADO::$tableName, UserADO::$colAvatar_path, UserADO::$colId);
		$arrayValues = [$image->getAvatarPath(), $image->getId()];

		$conn->execution($cons, $arrayValues);
	}

	public static function getProfiles(){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in UserADO: ".$e->getMessage());
			die();
		}

		$cons = sprintf("SELECT `%s`,`%s`,`%s`, `%s` FROM `%s`",UserADO::$colId, UserADO::$colName, UserADO::$colSurname, UserADO::$colAvatar_path, UserADO::$tableName);
		$query = $conn->execution($cons, []);

		$result = $query->fetchAll(PDO::FETCH_ASSOC);

		return $result;
	}

	public static function findById($user){

		$cons = sprintf("SELECT * FROM `%s` WHERE %s = ?", UserADO::$tableName, UserADO::$colId);
		$values = [$user->getId()];

		return UserADO::findByQuery( $cons, $values );
	}

	public static function getNick($user){

		$cons = "select * from `".UserADO::$tableName."` where ".UserADO::$colNickname." = ?";
		$arrayValues = [$user->getNickname()];

		return UserADO::findByQuery( $cons, $arrayValues );
	}

	public static function getEmail($user){

		$cons = "select * from `".UserADO::$tableName."` where ".UserADO::$colEmail." = ?";
		$arrayValues = [$user->getEmail()];

		return UserADO::findByQuery( $cons, $arrayValues );
	}

	public static function updatePassword($user){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$cons = sprintf("UPDATE `%s` SET %s = ? WHERE %s = ?", UserADO::$tableName, UserADO::$colPassword, UserADO::$colId);
		$arrayValues = [$user->getPassword(), $user->getId()];

		$conn->execution($cons, $arrayValues);
	}

	public static function removeUser($user){

		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$cons = sprintf("DELETE FROM `%s` WHERE %s = ?", UserADO::$tableName, UserADO::$colId);
		$arrayValues = [$user->getId()];

		$conn->execution($cons, $arrayValues);
	}

	public static function givePrivileges($user){
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error connecting to DB";
			die();
		}

		$cons = sprintf("UPDATE `%s` SET %s = ? WHERE %s = ?", UserADO::$tableName, UserADO::$colPrivileges, UserADO::$colId);
		$arrayValues = [$user->getPrivileges(), $user->getId()];

		$conn->execution($cons, $arrayValues);
	}

	public static function getNewsletters(){

		//connect to db
		try{
			$conn = DBConnect::getInstance();
		}catch(PDOException $e){
			echo "Error executing query";
			error_log("Error executing query in UserADO: ".$e->getMessage());
			die();
		}

		$cons = sprintf("SELECT * FROM `%s` WHERE %s = 1", UserADO::$tableName, UserADO::$colNewsletter);
		$query = $conn->execution($cons, []);

		$result = $query->fetchAll(PDO::FETCH_ASSOC);

		return $result;
	}

}

?>
