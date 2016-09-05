<?php

require_once "ControllerInterface.php";
require_once "../views/NewViewClass.php";
require_once "../model/news.class.php";
require_once "../model/persist/newsADO.php";

class NewController implements ControllerInterface{

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
    		case 30000:
                $newView = new NewViewClass($this->getNews());
                break;

				case 30010:
								$newView = new NewViewClass($this->removeNew());
								break;

    		default:
    			$outPutData = array();
                $errors = array();
                $outPutData[0] = false;
                $errors[] = "There has been an error.";
                $outPutData[] = $errors;
                $newView = new NewViewClass($outPutData);
                error_log("Action not correct".$this->getAction());
    			break;
    	}

        return $newView->getData();
    }

		/**
		 * [Function to receive news and send it to the main page]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function getNews(){

        $outPutData = array();
        $errors = array();
        $outPutData[0] = true;

        $news = NewsADO::findAll();

        if(count($news) == 0){
            $outPutData[0] = false;
            $errors[] = "No news found in database";
        }
        else{
            $newsArray = array();

            foreach($news as $new){
                $newsArray[] = $new->getAll();
            }
        }

        if($outPutData[0]){
            $outPutData[] = $newsArray;
        }
        else{
            $outPutData = $errors;
        }



        return $outPutData;
    }

		/**
		 * [Function to remove news of database]
		 */
		private function removeNew(){
			$newObj = json_decode(stripslashes($this->getJsonData()));

			$news = new NewsClass();

			$news->_setId($newObj);
			$all = NewsADO::findAllByNewId($news);

			$path = $all[0]->getPhotoNewPath();

			$filename = "../../".$path;

			if(file_exists($filename)){
				unlink($filename);
				NewsAdo::removeNew($news);
			}
		}
}
?>
