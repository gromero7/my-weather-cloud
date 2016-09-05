<?php

require_once "ControllerInterface.php";
require_once "../views/UserViewClass.php";
require_once "../model/user.class.php";
require_once "../model/persist/userADO.php";
require "../../libs/PHPMailer-master/PHPMailerAutoload.php";

class UserController implements ControllerInterface{

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
						case 10000:
								$userView = new UserViewClass($this->getUser());
								break;

            case 10011:
                $userView = new UserViewClass($this->userSignUp());
                break;

            case 10033:
                $userView = new UserViewClass($this->UserLogout());
                break;

            case 10055:
                $userView = new UserViewClass($this->UserLogin());
                break;

            case 10077:
                $userView = new UserViewClass($this->sessionControl());
                break;

            case 10099:
                $userView = new UserViewClass($this->updateUserData());
                break;

						case 10100:
								$userView = new UserViewClass($this->viewProfiles());
								break;

						case 10110:
								$userView = new UserViewClass($this->getUserProfile());
								break;

						case 10120:
								$userView = new UserViewClass($this->recoverPassword());
								break;

						case 10130:
								$userView = new UserViewClass($this->codeRecoveryPassword());
								break;

						case 10140:
								$userView = new UserViewClass($this->deleteUser());
								break;

						case 10150:
								$userView = new UserViewClass($this->givePrivileges());
								break;

    		default:
    			$outPutData = array();
                $errors = array();
                $outPutData[0] = false;
                $errors[] = "There has been an error.";
                $outPutData[] = $errors;
                $userView = new UserViewClass($outPutData);
                error_log("Action not correct".$this->getAction());
    			break;
    	}

        return $userView->getData();
    }

		/**
		 * [Function to receive user]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function getUser(){
			$userObj = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$user = new UserClass();
			$user->_setNickname($userObj->nickname);

			$userList = UserADO::findByNick($user);

			if(count($userList) == 0){
					$outPutData[0] = false;
					$errors[] = "User or password incorrect";
					$outPutData[1] = $errors;
			}
			else{
					$usersArray = array();

					foreach($userList as $user){
							$usersArray[] = $user->getAll();
					}

					$_SESSION["connectedUser"] = $userList[0];

					$outPutData[1] = $usersArray;
			}

			return $outPutData;
		}

		/**
		 * [Function to check if there is a session created]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function sessionControl(){

        $outPutData = array();
        $outPutData[] = true;

        if(isset($_SESSION["connectedUser"])){
            $outPutData[] = $_SESSION["connectedUser"]->getAll();
        }
        else{
            $outPutData[0] = false;
            $errors[] = "No session opened";
            $outPutData[1] = $errors;
        }

        return $outPutData;
    }

		/**
		 * [Function to do log in into application]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function UserLogin(){

        $userObj = json_decode(stripslashes($this->getJsonData()));

        $outPutData = array();
        $errors = array();
        $outPutData[0] = true;

        $user = new UserClass();
        $user->_setNickname($userObj->nickname);
        $user->_setPassword(hash('sha256', $userObj->password));

        $userList = UserADO::findByNickAndPass($user);

        if(count($userList) == 0){
            $outPutData[0] = false;
            $errors[] = "User or password incorrect";
            $outPutData[1] = $errors;
        }
        else{
            $usersArray = array();

            foreach($userList as $user){
                $usersArray[] = $user->getAll();
            }

            $_SESSION["connectedUser"] = $userList[0];

            $outPutData[1] = $usersArray;
        }

        return $outPutData;
    }

		/**
		 * [Function to log out of application]
		 */
    private function UserLogout(){
        session_unset();
        session_destroy();
        $outPutData = array();

        $outPutData[0] = true;
        $userView = new UserViewClass($outPutData);
    }

		/**
		 * [Function to register a user]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function userSignUp(){

        $usersArr = json_decode(stripslashes($this->getJsonData()));

				if(!isset($usersArr->surname)){
					$surname = "";
				}
				else{
					$surname = $usersArr->surname;
				}

        $user = new UserClass();
        $user->setAll("",$usersArr->name, $surname, $usersArr->nickname, "", $usersArr->email, "", hash('sha256', $usersArr->password), "", $usersArr->newsletter, "");

				$nick = UserADO::getNick($user);
				$email = UserADO::getEmail($user);

				if(count($nick) == 0){
					if(count($email) == 0){
						$outPutData = array();
		        $outPutData[]= true;

		        $user->_setId(UserADO::create($user));

		        $outPutData[] = array($user->getAll());

		        return $outPutData;
					}
					else{
						$outPutData[0] = false;
						$errors[] = "Email already in use! Please change it";
						$outPutData[1] = $errors;

						return $outPutData;
					}

        }
        else{
					$outPutData[0] = false;
					$errors[] = "Nickname already in use! Please change it";
					$outPutData[1] = $errors;

					return $outPutData;
        }
    }

		/**
		 * [Function to update user data in his profile]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
    private function updateUserData(){

        $usersArr = json_decode(stripslashes($this->getJsonData()));

				$outPutData = array();
        $outPutData[] = true;
				$varAux = array();

				$user = new UserClass();
	      $user->setAll($usersArr->user_id,$usersArr->name, $usersArr->surname, $usersArr->nickname, $usersArr->location, $usersArr->email, $usersArr->birthday, hash('sha256', $usersArr->password), $usersArr->privileges, $usersArr->newsletter, $usersArr->avatar_path);

				UserADO::update($user);
				$_SESSION["connectedUser"] = $user;
        return $outPutData;
    }

		/**
		 * [Function to receive users for watch in the nav bar searcher]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function viewProfiles(){

			$outPutData = array();
			$outPutData[] = true;

			$allProfiles = UserADO::getProfiles();

			$outPutData[] = $allProfiles;

			return $outPutData;
		}

		/**
		 * [Function to receive user profiles and see it]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function getUserProfile(){
			$userObj = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$user = new UserClass();
			$user->_setId(intval($userObj));

			$userList = UserADO::findById($user);

			if(count($userList) == 0){
					$outPutData[0] = false;
					$errors[] = "The user does not exists!";
					$outPutData[1] = $errors;
			}
			else{
					$usersArray = array();

					foreach($userList as $user){
							$usersArray[] = $user->getAllExcept();
					}

					$outPutData[1] = $usersArray;
			}

			return $outPutData;
		}

		/**
		 * [Function to send and email for recover password]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function recoverPassword(){
			$usersArr = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$success = array();
			$outPutData[0] = true;

			$user = new UserClass();
			$user->_setEmail($usersArr);

			$email = UserADO::getEmail($user);

			if(count($email) == 0){
				$errors = "Error in the server. Email not found";
				$outPutData[0] = false;
				$outPutData[1] = $errors;
				$outPutData[2] = true;
				return $outPutData;
			}
			else{
				$id = $email[0]->getId();
				$emailReceived = $email[0]->getEmail();
				$nameReceived = $email[0]->getName();
				$currentDate = date('H:i');
				$toSum = explode(":", $currentDate);

				$mail = new PHPMailer;

				$mail->isSMTP();                                      // Set mailer to use SMTP
				$mail->Host = 'smtp.gmail.com';  												// Specify main and backup SMTP servers
				$mail->SMTPAuth = true;                               // Enable SMTP authentication
				$mail->Username = 'myweathercloudstaff@gmail.com';    // SMTP username
				$mail->Password = 'weatheradministrator7';            // SMTP password
				$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
				$mail->Port = 465;                                    // TCP port to connect to

				$mail->setFrom('myweathercloudstaff@gmail.com', 'My Weather Cloud Helper');
				$mail->addAddress($emailReceived, $nameReceived);     // Add a recipient

				$mail->addAttachment('../../assets/banner_mwc.png');    // Optional name
				$mail->isHTML(true);                                  // Set email format to HTML

				$mail->Subject = 'Recovery password';
				$mail->Body    = 'Hey, '.$nameReceived.'. Here is your code in order to recover your password: '.(substr(md5(92*cos(25)*$id*$toSum[0]),0,-24))."<br><br>Click here to recover your account: http://www.provenapps.cat/~daw16-18/html/recoverPassword.html?id=".hash('md5', $id)."<br><br>Code are only available for 1 hour. <br><br><br>Thank you for use My Weather Cloud service!";
				$mail->AltBody = 'Hey, '.$nameReceived.'. Here is your code in order to recover your password: '.(substr(md5(92*cos(25)*$id*$toSum[0]),0,-24)). "Click here to recover your account: http://www.provenapps.cat/~daw16-18/html/recoverPassword.html?id=".hash('md5', $id).". Code are only available for 1 hour. Thank you for use My Weather Cloud service!";

				if(!$mail->send()) {
				    $errors = 'Message could not be sent.';
				    echo 'Mailer Error: ' . $mail->ErrorInfo;
						$outPutData[1] = $errors;
						$outPutData[0] = false;
						return $outPutData;
				} else {
				    $success = 'Message has been sent';
						$outPutData[1] = $success;
						$outPutData[0] = true;
						return $outPutData;
				}
			}
		}

		/**
		 * [Function to recover password introducing a code]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function codeRecoveryPassword(){
			$usersArr = json_decode(stripslashes($this->getJsonData()));

			$tokenReceived = $usersArr[0];
			$tokenCode = $usersArr[1];
			$currentDate = date('H:i');
			$toSum = explode(":", $currentDate);

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$results = UserADO::getProfiles();


			for($i = 0; $i < count($results); $i++){
				if(hash('md5',$results[$i]["user_id"]) == $tokenReceived){
					$id = $results[$i]["user_id"];
					$code = (substr(md5(92*cos(25)*$id*$toSum[0]),0,-24));
					if($tokenCode == $code){
						$user = new UserClass();
		        $user->_setId($id);
		        $user->_setPassword(hash('sha256', $usersArr[2]));

						UserADO::updatePassword($user);
						return $outPutData;
					}
					else{
						$outPutData[0] = false;
						return $outPutData;
					}
				}
				else{
					$outPutData[0] = false;
					return $outPutData;
				}
			}
		}

		/**
		 * [Function to delete a user by administrator]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function deleteUser(){
			$usersArr = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$user = new UserClass();
			$user->_setId($usersArr);

			if($usersArr != ""){
				UserADO::removeUser($user);
			}
			else{
				$errors = "Database problems. Try later.";
				$outPutData[1] = $errors;
			}

			return $outPutData;
		}

		/**
		 * [Function to receive privileges by administrator]
		 * @return [object array] [outputdata with first position true or false and second for object or errors]
		 */
		private function givePrivileges(){
			$usersArr = json_decode(stripslashes($this->getJsonData()));

			$outPutData = array();
			$errors = array();
			$outPutData[0] = true;

			$user = new UserClass();
			$user->_setId($usersArr);
			$user->_setPrivileges("1");

			if($usersArr != ""){
				UserADO::givePrivileges($user);
			}
			else{
				$errors = "Database problems. Try later.";
				$outPutData[1] = $errors;
			}

			return $outPutData;
		}

}

?>
