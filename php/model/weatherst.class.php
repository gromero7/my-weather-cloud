<?php

require_once "EntityInterface.php";

class WeatherstClass implements EntityInterface{

	private $id;
	private $userid;
	private $logPath;

	private static $tableName = "weather_station";
	private static $colId = "weather_id";
	private static $colUserId = "user_id";
	private static $colLogPath = "log_path";

	function __construct(){
	}



    /**
     * Gets the value of id.
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Sets the value of id.
     *
     * @param mixed $id the id
     *
     * @return self
     */
    public function _setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Gets the value of userid.
     *
     * @return mixed
     */
    public function getUserid()
    {
        return $this->userid;
    }

    /**
     * Sets the value of userid.
     *
     * @param mixed $userid the userid
     *
     * @return self
     */
    public function _setUserid($userid)
    {
        $this->userid = $userid;

        return $this;
    }

    /**
     * Gets the value of logPath.
     *
     * @return mixed
     */
    public function getLogPath()
    {
        return $this->logPath;
    }

    /**
     * Sets the value of logPath.
     *
     * @param mixed $logPath the log path
     *
     * @return self
     */
    public function _setLogPath($logPath)
    {
        $this->logPath = $logPath;

        return $this;
    }

    /**
     * Gets the value of tableName.
     *
     * @return mixed
     */
    public function getTableName()
    {
        return $this->tableName;
    }

    /**
     * Sets the value of tableName.
     *
     * @param mixed $tableName the table name
     *
     * @return self
     */
    public function _setTableName($tableName)
    {
        $this->tableName = $tableName;

        return $this;
    }


    //main functions
    

    public function getAll(){
    	$data = array(
    		"weather_id" => $this->id,
    		"user_id"    => $this->userid,
    		"log_path" 	 => $this->logPath
    		);

    	return $data;
    }

    /**
     * [setAll description]
     * @param [type] $userid  [description]
     * @param [type] $logPath [description]
     */
    public function setAll($userid, $logPath){

    	$this->_setUserid($userid);
    	$this->_setLogPath($logPath);
    }

    /*public function toString(){

    	return $toString;
    }*/
}

?>