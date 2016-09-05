<?php

/**
 * Class for connect to database
 */
class DBConnect{

	private $server;
	private $user;
	private $password;
	private $dataBase;
	private $link;
	private $stmt;
	private $array = array();

	static $_instance;

	/**
	 * A function of construct
	 */
	private function __construct(){
		$this->setConnection();
		$this->connection();
	}

	/**
	 * A function to set to each parameter his value to connect to server
	 */
	private function setConnection(){
		$this->server = "localhost";
		$this->dataBase = ""; //database name
		$this->user = ""; //database user
		$this->password = ""; //database password
	}

	/**
	 * A function to do the connection to DB with his parameters introduced
	 */
	private function connection(){
		try{
			$this->link = new PDO("mysql:dbname=".$this->dataBase.";host=".$this->server, $this->user, $this->password);
		}catch(PDOException $e){
			$this->link = null;
			echo "<span class='error_class'>Error connection to database</span>";
			error_log("Error connecting to database: ".$e);
		}
	}

	public function getLink(){
		return $this->link;
	}

	private function __clone(){}

	/**
	 * @return
	 */
	public static function getInstance(){
		if(!(self::$_instance instanceof self)){
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * @param  $sql
	 * @param  $query is the query that user want to do
	 * @return $this->stmt returns the query or affected rows in the query
	 */
	public function execution($sql, $query){
		if($this->link != null){
			$this->stmt = $this->link->prepare($sql);

			try{
				$this->stmt->execute($query);
			}catch(PDOException $e){
				$this->link = null;
				echo "<span class='err_query'>Error executing query</span>";
				error_log("Error executing query: ".$e);
			}
		}
		else{
			$this->stmt = null;
		}

		//return query
		return $this->stmt;
	}

	public function executingSelect($query){
		if($this->link != null){
			try{
				$this->stmt->query($query);
			}catch(PDOException $e){
				$this->link = null;
				echo "<span class='err_query'>Error executing query</span>";
				error_log("Error executing query: ".$e);
			}
		}
		else{
			$this->stmt = null;
		}

		//return query
		return $this->stmt;
	}



	/**
	 * @param  [sql sentence]
	 * @param  [sql query]
	 * @return [number] id
	 */
	public function executionInsert($sql, $query){
		if($this->link != null){
			$this->stmt = $this->link->prepare($sql);

			try{
				$this->stmt->execute($query);
				$id = $this->link->lastInsertId();
			}catch(PDOException $e){
				$this->link = null;
				echo "<span class='err_query'>Error executing insert</span>";
				error_log("Error executing insert: ".$e);
			}
		}
		else{
			$id = null;
		}

		return $id;
	}
}

?>
