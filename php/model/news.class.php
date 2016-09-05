<?php

require_once "EntityInterface.php";

class NewsClass implements EntityInterface{

	private $id;
	private $title;
	private $description;
	private $photo_new_path;
	private $font;

	private static $tableName = "new";
	private static $colId = "new_id";
	private static $colTitle = "title";
	private static $colDescription = "description";
	private static $colPhotoNewPath = "photo_new_path";
	private static $colFont = "font";

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
     * Gets the value of title.
     *
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the value of title.
     *
     * @param mixed $title the title
     *
     * @return self
     */
    public function _setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Gets the value of description.
     *
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Sets the value of description.
     *
     * @param mixed $description the description
     *
     * @return self
     */
    public function _setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Gets the value of photo_new_path.
     *
     * @return mixed
     */
    public function getPhotoNewPath()
    {
        return $this->photo_new_path;
    }

    /**
     * Sets the value of photo_new_path.
     *
     * @param mixed $photo_new_path the photo new path
     *
     * @return self
     */
    public function _setPhotoNewPath($photo_new_path)
    {
        $this->photo_new_path = $photo_new_path;

        return $this;
    }

		public function getFont(){
			return $this->font;
		}

		public function _setFont($font){
			$this->font = $font;
			return $this;
		}

    public function getAll(){
    	$data = array(
    		"new_id" 	  			=> $this->id,
    		"title"  	  			=> $this->title,
    		"description"			=> $this->description,
    		"photo_new_path"	=> $this->photo_new_path,
				"font"						=> $this->font
    	);

    	return $data;
    }

    public function setAll($id, $title, $description, $photo_new_path, $font){

    	$this->_setId($id);
    	$this->_setTitle($title);
    	$this->_setDescription($description);
    	$this->_setPhotoNewPath($photo_new_path);
			$this->_setFont($font);
    }
}

?>
