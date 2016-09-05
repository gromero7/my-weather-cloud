<?php

require_once "ControllerInterface.php";
require_once "../views/PhotoViewClass.php";
require_once "../model/photo.class.php";
require_once "../model/persist/photoADO.php";

class PhotoController implements ControllerInterface{

	private $action;
	private $jsonData;

	function __construct($action, $jsonData){
		$this->_setAction($action);
		$this->_setJsonData($jsonData);
	}

    /**
     * Gets the value of action.
     *
     * @return mixed
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Sets the value of action.
     *
     * @param mixed $action the action
     *
     * @return self
     */
    public function _setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Gets the value of jsonData.
     *
     * @return mixed
     */
    public function getJsonData()
    {
        return $this->jsonData;
    }

    /**
     * Sets the value of jsonData.
     *
     * @param mixed $jsonData the json data
     *
     * @return self
     */
    public function _setJsonData($jsonData)
    {
        $this->jsonData = $jsonData;

        return $this;
    }

    public function doAction(){
    	switch ($this->getAction()) {
    		case 40000:
        	$photoView = new PhotoViewClass($this->getPhotos());
          break;

				case 40010:
					$photoView = new PhotoViewClass($this->removePhotos());
					break;

    		default:
    			$outPutData = array();
                $errors = array();
                $outPutData[0] = false;
                $errors[] = "There has been an error.";
                $outPutData[] = $errors;
                $photoView = new PhotoViewClass($outPutData);
                error_log("Action not correct".$this->getAction());
    			break;
    	}

        return $photoView->getData();
    }

		/**
		 * [Function to receive photos to profile ]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function getPhotos(){

			$photoObj = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$photo = new PhotoClass();
			$photo->setUser_id($photoObj->user_id);

			$photos = PhotoADO::findAll($photo);

			if(count($photos) == 0){
				$outPutData[0] = false;
				$errors[] = "No photos found in database";
			}
			else{
				$photosArray = array();

				foreach($photos as $pho){
					$photosArray[] = $pho->getAll();
				}
			}

			if($outPutData[0]){
				$outPutData[] = $photosArray;
			}
			else{
				$outPutData = $errors;
			}

			return $outPutData;
    }

		/**
		 * [Function to remove photos]
		 */
		private function removePhotos(){
			$received = json_decode(stripslashes($this->getJsonData()));

			$photo = new PhotoClass();

			$photo->setId($received);
			$all = PhotoADO::findAllByPhotoId($photo);

			$path = $all[0]->getPhoto_path();
			$user = $all[0]->getUser_id();
			$path_ex = explode("/", $path);

			$filename = "../../".$path;

			if(file_exists($filename)){
				unlink($filename);
				PhotoAdo::removePhoto($photo);
			}
		}

}




?>
