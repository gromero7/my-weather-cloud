<?php

require_once "EntityInterface.php";

class UserClass implements EntityInterface{
	private $id;
	private $name;
	private $surname;
	private $nickname;
	private $location;
	private $email;
	private $birthday;
	private $password;
	private $privileges;
	private $newsletter;
	private $avatar_path;

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
     * Gets the value of name.
     *
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the value of name.
     *
     * @param mixed $name the name
     *
     * @return self
     */
    public function _setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Gets the value of surname.
     *
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Sets the value of surname.
     *
     * @param mixed $surname the surname
     *
     * @return self
     */
    public function _setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Gets the value of nickname.
     *
     * @return mixed
     */
    public function getNickname()
    {
        return $this->nickname;
    }

    /**
     * Sets the value of nickname.
     *
     * @param mixed $nickname the nickname
     *
     * @return self
     */
    public function _setNickname($nickname)
    {
        $this->nickname = $nickname;

        return $this;
    }

    /**
     * Gets the value of location.
     *
     * @return mixed
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Sets the value of location.
     *
     * @param mixed $location the location
     *
     * @return self
     */
    public function _setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Gets the value of email.
     *
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Sets the value of email.
     *
     * @param mixed $email the email
     *
     * @return self
     */
    public function _setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Gets the value of birthday.
     *
     * @return mixed
     */
    public function getBirthday()
    {
        return $this->birthday;
    }

    /**
     * Sets the value of birthday.
     *
     * @param mixed $birthday the birthday
     *
     * @return self
     */
    public function _setBirthday($birthday)
    {
        $this->birthday = $birthday;

        return $this;
    }

    /**
     * Gets the value of password.
     *
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Sets the value of password.
     *
     * @param mixed $password the password
     *
     * @return self
     */
    public function _setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Gets the value of privileges.
     *
     * @return mixed
     */
    public function getPrivileges()
    {
        return $this->privileges;
    }

    /**
     * Sets the value of privileges.
     *
     * @param mixed $privileges the privileges
     *
     * @return self
     */
    public function _setPrivileges($privileges)
    {
        $this->privileges = $privileges;

        return $this;
    }

    /**
     * Gets the value of newsletter.
     *
     * @return mixed
     */
    public function getNewsletter()
    {
        return $this->newsletter;
    }

    /**
     * Sets the value of newsletter.
     *
     * @param mixed $newsletter the newsletter
     *
     * @return self
     */
    public function _setNewsletter($newsletter)
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    /**
     * Gets the value of avatar_path.
     *
     * @return mixed
     */
    public function getAvatarPath()
    {
        return $this->avatar_path;
    }

    /**
     * Sets the value of avatar_path.
     *
     * @param mixed $avatar_path the avatar path
     *
     * @return self
     */
    public function _setAvatarPath($avatar_path)
    {
        $this->avatar_path = $avatar_path;

        return $this;
    }


    /**
     * @return all $data of user
     */
    public function getAll(){
    	$data = array(
    		"user_id"     => $this->id,
    		"name"        => $this->name,
    		"surname"     => $this->surname,
    		"nickname"    => $this->nickname,
    		"location"    => $this->location,
    		"email"       => $this->email,
    		"birthday"    => $this->birthday,
    		"password"    => $this->password,
    		"privileges"  => $this->privileges,
    		"newsletter"  => $this->newsletter,
    		"avatar_path" => $this->avatar_path
    		);

    	return $data;
    }

		public function getAllExcept(){
    	$data = array(
    		"user_id"     => $this->id,
    		"name"        => $this->name,
    		"surname"     => $this->surname,
    		"nickname"    => "",
    		"location"    => $this->location,
    		"email"       => $this->email,
    		"birthday"    => $this->birthday,
    		"password"    => "",
    		"privileges"  => "",
    		"newsletter"  => "",
    		"avatar_path" => $this->avatar_path
    		);

    	return $data;
    }

    /**
     * @param $id
     * @param $name
     * @param $surname
     * @param $nickname
     * @param $location
     * @param $email
     * @param $birthday
     * @param $password
     * @param $privileges
     * @param $newsletter
     * @param $avatar_path
     */
    public function setAll($id, $name, $surname, $nickname, $location, $email, $birthday, $password, $privileges, $newsletter, $avatar_path){

      $this->_setId($id);
    	$this->_setName($name);
    	$this->_setSurname($surname);
    	$this->_setNickname($nickname);
    	$this->_setLocation($location);
    	$this->_setEmail($email);
    	$this->_setBirthday($birthday);
    	$this->_setPassword($password);
    	$this->_setPrivileges($privileges);
    	$this->_setNewsletter($newsletter);
    	$this->_setAvatarPath($avatar_path);
    }


    /**
     * @return $toString with the parameters of id, name, surname, password and email
     */
    public function toString(){
    	$toString = "userClass[id=" .$this->id."][name=". $this->getName(). "][surname=". $this->getSurname() . "][password=".$this->password ."][email=". $this->email . "]";

    	return $toString;
    }
}

?>
