/**
 * [newObj object of a new]
 */
function newObj() {

  this.id;
  this.title;
  this.description;
  this.newPhotoPath;

  /**
   * to construct an object of new
   * @param  {[int]} id           [the id of new]
   * @param  {[String]} title        [title of new]
   * @param  {[String]} description  [description of new]
   * @param  {[String]} newPhotoPath [path for photo of new]
   */
  this.construct = function(id, title, description, newPhotoPath) {
    this.setId(id);
    this.setTitle(title);
    this.setDescription(description);
    this.setNewPhotoPath(newPhotoPath);
  }

  /*this.getAll = function(){
  	$data = array();
  	$data["id"] = $this.id;
  	$data["title"] = $this.title;
  	$data["description"] = $this.description;
  	$data["newPhotoPath"] = $this.newPhotoPath;

  	return $data;
  }*/

  this.setId = function(id) {
    this.id = id;
  }
  this.getId = function() {
    return this.id;
  }

  this.setTitle = function(title) {
    this.title = title;
  }
  this.getTitle = function() {
    return this.title;
  }

  this.setDescription = function(description) {
    this.description = description;
  }
  this.getDescription = function() {
    return this.description;
  }

  this.setNewPhotoPath = function(newPhotoPath) {
    this.newPhotoPath = newPhotoPath;
  }
  this.getNewPhotoPath = function() {
    return this.newPhotoPath;
  }

}
