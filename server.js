var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs'); // we added
var fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
var pg = require('pg');
var format = require('pg-format');
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './build')));
app.use(fileUpload()); 
var config = 
  {  user: 'rachel', // name of the user account
    database: 'rachel', // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

var pool = new pg.Pool(config)
var myClient;
pool.connect(function (err, client, done) {
  if (err) console.log(err)
  myClient = client
})
//gets data from database
app.get('/timeline', function(req,res) {
    query = 'SELECT * FROM status'; 
    myClient.query(query, function (err, result) {
      if (err) console.log(err)
      res.send(result.rows); 
    });
})
// gets photos
app.get('/images/:id', function(req,res) {
  res.sendFile(path.join(__dirname, req.url))
});
// takes form data from user and puts it on the database
app.post('/upload', function(req,res) {
  var file = req.files.catPic;
  var status = req.body.status;
  var username = req.body.user; 
  // Use the mv() method to place the file somewhere on your server
  file.mv(path.join(__dirname, './images/',file.name), function(err) {
    if (err) return res.status(500).send(err);
    var image = './images/'+file.name;
    query = 'INSERT INTO status(username, text, image) VALUES ($1, $2, $3)'; 
    myClient.query(query, [username, status, image], function (err, result) {
      if (err) console.log(err)
      res.send('File uploaded!');
    })
  });
}); 

//redirects to home if invaild path
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build'));
});  

app.listen(3000, function() {
    console.log('Shortly is listening on 3000');
});
