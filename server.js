var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var bcrypt = require('bcrypt-nodejs'); // we added
var fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
var pg = require('pg');
var format = require('pg-format');
var cmd = require('node-cmd'); 

app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['catbook']
}));

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
  var petname = req.body.petname;
  var username= 1; /************************** need to change to use sessions */
  // Use the mv() method to place the file somewhere on your server
  file.mv(path.join(__dirname, './images/',file.name), function(err) {
    if (err) return res.status(500).send(err);
    var image = './images/'+file.name;
    cmd.run()
    query = 'INSERT INTO status(petname, username, text, image) VALUES ($1, $2, $3, $4)'; 
    myClient.query(query, [petname, username, status, image], function (err, result) {
      if (err) console.log(err)
      res.redirect('/');
    })
  });
}); 

app.post('/signup', function(req, res) {

    req.session.username = req.body.username;
    req.session.password = req.body.password;
    query = 'INSERT INTO users(username) VALUES ($1)'; 
    myClient.query(query, [req.body.username], function (err, result) {
      if (err) return res.status(500).send(err);  
      res.redirect('/');
    });
});

app.post('/login', function(req, res) {
  // find user in system
  // TODO not done
  //console.log('ID of user found',user);
    if (user !== null) {
      bcrypt.compare(req.body.password, user.attributes.password, function(err, result) {
        if (!result) {
          res.redirect('/login');
        } else {
          req.session.username = req.body.username;
          req.session.password = req.body.password;
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/signup');
    }
   //console.log('after stuff session', req.session);
});

//redirects to home if invaild path
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build'));
});  

app.listen(3000, function() {
    console.log('Shortly is listening on 3000');
});
