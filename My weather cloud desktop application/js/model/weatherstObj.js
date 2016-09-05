function weatherstObj() {

  //attr
  this.weather_id;
  this.user_id;
  this.model;
  this.name;
  this.log_path;

  /**
   * [Generate a weatherst object to use]
   * @param  {[int]} user_id  [user linked with this weather st]
   * @param  {[String]} model    [model of weather st]
   * @param  {[String]} name     [name of weather st]
   * @param  {[String]} log_path [path in server of weather st]
   */
  this.construct = function(weather_id, user_id, model, name, log_path) {
    this.setWeatherId(weather_id);
    this.setUserId(user_id);
    this.setModel(model);
    this.setName(name);
    this.setLogPath(log_path);
  }

  this.setWeatherId = function(weather_id) {
    this.weather_id = weather_id;
  }
  this.getWeatherId = function() {
    return this.weather_id;
  }

  this.setUserId = function(user_id) {
    this.user_id = user_id;
  }
  this.getUserId = function() {
    return this.user_id;
  }

  this.setModel = function(model) {
    this.model = model;
  }
  this.getModel = function() {
    return this.model;
  }

  this.setName = function(name) {
    this.name = name;
  }
  this.getName = function() {
    return this.name;
  }

  this.setLogPath = function(log_path) {
    this.log_path = log_path;
  }
  this.getLogPath = function() {
    return this.log_path;
  }


  /*this.toString = function(){

  	var weatherString = ...
  }*/
}
