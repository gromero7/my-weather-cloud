function weatherstObj() {

  //attr
  this.weather_id;
  this.user_id;
  this.log_path;

  /**
   * [Generate a weatherst object to use]
   * @param  {[int]} user_id  [user linked with this weather st]
   * @param  {[String]} log_path [path in server of weather st]
   */
  this.construct = function(weather_id, user_id, log_path) {
    this.setWeatherId(weather_id);
    this.setUserId(user_id);
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

  this.setLogPath = function(log_path) {
    this.log_path = log_path;
  }
  this.getLogPath = function() {
    return this.log_path;
  }

}
