function photoObj() {
    this.id;
    this.userid;
    this.photo_name;
    this.photo_path;
    this.photo_location;
    this.photo_type;
    this.photo_time;

    /**
     * [function description]
     * @param  {[int]} userid            [id of user]
     * @param  {[string]} photo_name     [name of photo]
     * @param  {[string]} photo_path     [path of photo]
     * @param  {[string]} photo_location [location of photo (ex: Barcelona)]
     * @param  {[string]} photo_type     [type of photo(ex: jpeg, png)]
     * @param  {[date]} photo_time       [date of photo was taken]
     */
    this.construct = function(id, userid, photo_name, photo_path, photo_location, photo_type, photo_time) {
        this.setId(id);
        this.setUserid(userid);
        this.setPhoto_name(photo_name);
        this.setPhoto_path(photo_path);
        this.setPhoto_location(photo_location);
        this.setPhoto_type(photo_type);
        this.setPhoto_time(photo_time);
    }

    this.setId = function(id) {
        this.id = id;
    }
    this.getId = function() {
        return this.id;
    }
    this.setUserid = function(userid) {
        this.userid = userid;
    }
    this.getUserid = function() {
        return this.userid;
    }
    this.setPhoto_name = function(photo_name) {
        this.photo_name = photo_name;
    }
    this.getPhoto_name = function() {
        return this.photo_name;
    }
    this.setPhoto_path = function(photo_path) {
        this.photo_path = photo_path;
    }
    this.getPhoto_path = function() {
        return this.photo_path;
    }
    this.setPhoto_location = function(photo_location) {
        this.photo_location = photo_location;
    }
    this.getPhoto_location = function() {
        return this.photo_location;
    }
    this.setPhoto_type = function(photo_type) {
        this.photo_type = photo_type;
    }
    this.getPhoto_type = function() {
        return this.photo_type;
    }
    this.setPhoto_time = function(photo_time) {
        this.photo_time = photo_time;
    }
    this.getPhoto_time = function() {
        return this.photo_time;
    }

}
