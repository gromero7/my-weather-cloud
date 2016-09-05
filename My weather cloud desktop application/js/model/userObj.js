function userObj() {

  //attributes
  this.user_id;
  this.name;
  this.surname;
  this.nickname;
  this.location;
  this.email;
  this.birthday;
  this.password;
  this.schedule;
  this.privileges;
  this.newsletter;
  this.avatar_path;

  /**
   * [construct description]
   * @param  {[type]} id         [description]
   * @param  {[type]} name       [description]
   * @param  {[type]} surname    [description]
   * @param  {[type]} nickname   [description]
   * @param  {[type]} location   [description]
   * @param  {[type]} email      [description]
   * @param  {[type]} birthday   [description]
   * @param  {[type]} password   [description]
   * @param  {[type]} schedule   [description]
   * @param  {[type]} privileges [description]
   * @param  {[type]} newsletter [description]
   * @param  {[type]} avatarPath [description]
   * @return {[type]}            [description]
   */
  this.construct = function(user_id, name, surname, nickname, location, email, birthday, password, schedule, privileges, newsletter, avatar_path) {
    this.setUserId(user_id);
    this.setName(name);
    this.setSurname(surname);
    this.setNickname(nickname);
    this.setLocation(location);
    this.setEmail(email);
    this.setBirthday(birthday);
    this.setPassword(password);
    this.setSchedule(schedule);
    this.setPrivileges(privileges);
    this.setNewsletter(newsletter);
    this.setAvatarPath(avatar_path);
  }

  this.setUserId = function(user_id) {
    this.user_id = user_id;
  }
  this.getUserId = function() {
    return this.user_id;
  }

  this.setName = function(name) {
    this.name = name;
  }
  this.getName = function() {
    return this.name;
  }

  this.setSurname = function(surname) {
    this.surname = surname;
  }
  this.getSurname = function() {
    return this.surname;
  }

  this.setNickname = function(nickname) {
    this.nickname = nickname;
  }
  this.getNickname = function() {
    return this.nickname;
  }

  this.setLocation = function(location) {
    this.location = location;
  }
  this.getLocation = function() {
    return this.location;
  }

  this.setEmail = function(email) {
    this.email = email;
  }
  this.getEmail = function() {
    return this.email;
  }

  this.setBirthday = function(birthday) {
    this.birthday = birthday;
  }
  this.getBirthday = function() {
    return this.birthday;
  }

  this.setPassword = function(password) {
    this.password = password;
  }
  this.getPassword = function() {
    return this.password;
  }

  this.setSchedule = function(schedule) {
    this.schedule = schedule;
  }
  this.getSchedule = function() {
    return this.schedule;
  }

  this.setPrivileges = function(privileges) {
    this.privileges = privileges;
  }
  this.getPrivileges = function() {
    return this.privileges;
  }

  this.setNewsletter = function(newsletter) {
    this.newsletter = newsletter;
  }
  this.getNewsletter = function() {
    return this.newsletter;
  }

  this.setAvatarPath = function(avatar_path) {
    this.avatar_path = avatar_path;
  }
  this.getAvatarPath = function() {
    return this.avatar_path;
  }

  /**
   * Convert an object to String
   * @return {[type]} [description]
   */
  this.toString = function() {

    var userString = "id=" + this.getUserId() + " name=" + this.getName() + " surname=" + this.getSurname();

    userString += " nickname=" + this.getNickname() + " password=" + this.getPassword() + " location=" + this.getLocation() + " email=" + this.getEmail();
    userString += " birthday=" + this.getBirthday() + " schedule=" + this.getSchedule() + " privileges=" + this.getPrivileges() + " newsletter=" + this.getNewsletter() + " avatar path=" + this.getAvatarPath();

    return userString;
  }

}
