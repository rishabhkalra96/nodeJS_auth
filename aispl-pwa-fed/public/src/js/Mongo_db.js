function open_m_db(){
	var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  
  var url = 'mongodb://localhost:27017/myproject';
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
}

function close_m_db(){
	console.log("closed mongo database triggered");
}
function mongo_add_entry(){
	console.log("connecting to mongo client at 27017");
	open_m_db();
  //db.close();
  close_m_db();
});
