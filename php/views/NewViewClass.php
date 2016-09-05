<?php

require_once "ViewInterface.php";

class NewViewClass implements ViewInterface{

	private $data;

	function __construct($data){
		$this->setData($data);
	}

	public function getData(){
		return $this->data;
	}

	public function setData($data){
		$this->data = $data;
	}
}

?>