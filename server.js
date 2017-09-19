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
  myClient = client;
})
//gets data from database
app.get('/timeline', function(req,res) {
    query = 'SELECT * FROM status'; 
    myClient.query(query, function (err, result) {
      if (err) console.log(err)
      res.send(result.rows); 
    }); 
});

app.get('/logout', function(req, res) {
  req.session = null;
  res.redirect('/'); 
});
// gets photos
app.get('/images/:id', checkUser, function(req,res) {
  res.sendFile(path.join(__dirname, req.url))
});
// takes form data from user and puts it on the database
app.post('/upload', checkUser, function(req,res) {
  var file = req.files.catPic;
  var status = req.body.status;
  var petname = req.body.petname;
  var username= req.session.username;  
  new Promise(function(resolve,reject) {
    var query = 'SELECT id FROM users WHERE username = $1';
    myClient.query(query, [username], function (err, result) {
      if (err) reject(err);
      resolve(result.rows[0].id);   
    });
  }).then ( function(id) {
    file.mv(path.join(__dirname, './images/',file.name), function(err) {
      if (err) return res.status(500).send(err);
      var image = './images/'+file.name;
      query = 'INSERT INTO status(petname, username, text, image) VALUES ($1, $2, $3, $4)'; 
      myClient.query(query, [petname, id, status, image], function (err, result) {
        if (err) console.log(err)
        res.redirect('/');
        res.end(); 
      })
    });
  })
}); 

app.post('/signup', function(req, res) {
  //inputs username and hashed password into database, saves username to session
  req.session.username = req.body.username;
  var bio = req.body.bio;
  var file = req.files.image; 

  new Promise( function(resolve, reject) {
    bcrypt.hash(req.body.password, null, null,function(err,hash) {
      if(err) reject(err); 
      resolve(hash); 
    })
  }).then( (hash) => {
    file.mv(path.join(__dirname, './images/',file.name), function(err) {
      if (err) return res.status(500).send(err);
      var image = './images/'+file.name;
      query = 'INSERT INTO users(username, password, bio, image) VALUES ($1, $2, $3, $4)'; 
      myClient.query(query, [req.body.username, hash, bio, image], function (err, result) {
        if (err) console.log(err)
        res.redirect('/');
        res.end(); 
      })
    });
  })
});

app.post('/login', function(req, res) {
  // find user in system then compares password with hased password 
  query = 'SELECT password FROM users WHERE username = $1';
  myClient.query(query, [req.body.username], function(err, result) {
    if (result.rows.length !== 0) {
      bcrypt.compare(req.body.password, result.rows[0], function(err, result) {
        if (!result) {
          res.redirect('/login');
        } else {
          req.session.username = req.body.username;
          res.redirect('/');
          res.end();
        }
      });
    } else {
      res.end(); 
      //res.redirect('/signup');
    }
  })  
});

app.get('/profile', function(req, res) {
  query = 'SELECT * FROM users WHERE username = $1';
  new Promise(function(resolve, reject) {
    myClient.query(query, [req.session.username], function(err, result) {
      if(err) reject(err);
      resolve(result.rows[0]); 
    })
  }).then((user) => {
    query = 'SELECT * FROM status WHERE username = $1';
    var id = user.id; 
    myClient.query(query, [id], function(err, result){
      var ret = [];
      ret.push(user);
      ret.push(result.rows); 
      res.send(ret); 
    }) 
  })
});

//redirects to home if invaild path
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build'));
}); 

app.listen(3000, function() {
    console.log('Shortly is listening on 3000');
});

function checkUser(req,res,next) {
  if (req.session.username === null) {
    console.alert("you shouldn't do that");
  } else {
    next(); 
  }
}
