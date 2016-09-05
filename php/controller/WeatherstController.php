<?php

require_once "ControllerInterface.php";
require_once "../views/WeatherViewClass.php";
require_once "../model/weatherst.class.php";
require_once "../model/persist/weatherstADO.php";
require_once "../model/user.class.php";
require_once "../model/wedata.class.php";

class WeatherstController implements ControllerInterface{

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
    private function _setAction($action)
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
    private function _setJsonData($jsonData)
    {
        $this->jsonData = $jsonData;

        return $this;
    }

    public function doAction(){
    	switch ($this->getAction()) {

				case 20033:
					$weatherView = new WeatherViewClass($this->getParseData());
					break;

				case 20044:
					$weatherView = new WeatherViewClass($this->makeGraphics());
					break;

    		default:
    			$outPutData = array();
    			$errors = array();
    			$outPutData[0] = false;
    			$errors[] = "There has been an error";
    			$outPutData[] = $errors;
    			$weatherView = new WeatherViewClass($outPutData);
    			error_log("Action not correct ".$this->getAction());
    			break;
    	}

    	return $weatherView->getData();
    }

		/**
		 * [Function to data of weather stations log and show it in weatherst html]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function getParseData(){

			$dataArr = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$outPutData[0] = true;

			$dataUser = new UserClass();
			$dataUser->_setId($dataArr->user_id);

			$data = file_get_contents('../../weatherStations/user-'.$dataArr->user_id."/realtime.txt");

			$finalArray[] = explode(" ", $data);

			$wedata = new WeDataClass();

			$wedata->setAll($finalArray[0]);

			$outPutData[1] = $wedata->getAll();

			return $outPutData;
		}

		/**
		 * [Function to make graphics with txt of weather stations data logs]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function makeGraphics(){

			$dataArr = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$outPutData[0] = true;
			$weatherdat = array();

			$dataUser = new UserClass();
			$dataUser->_setId($dataArr->user_id);

			$data = file_get_contents('../../weatherStations/user-'.$dataArr->user_id.'/accum-realtime.txt');

			$finalArray[] = explode("\n", $data);
			$i = 0;
			$dataObj = array();
			foreach ($finalArray[0] as $datArr) {
				$wedata = new WeDataClass();
				$dataObj[] = explode(" ", $datArr);
				$wedata->setAll($dataObj[$i]);
				$weatherdat[] = $wedata->getAll();
				$i++;
			}
			$outPutData[] = $weatherdat;
			return $outPutData;
		}
}

?>
