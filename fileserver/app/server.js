var path = require('path');
var Keycloak = require('keycloak-connect');
var hogan = require('hogan-express');
var express = require('express');
var session = require('express-session');

var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// Register '.mustache' extension with The Mustache Express
app.set('view engine', 'html');
app.set('views', require('path').join(__dirname, '/view'));
app.engine('html', hogan);

// Server static files.
app.use(express.static(path.join(__dirname, 'static')))

// A normal un-protected public URL.

app.get('/', function (req, res) {
  res.render('index');
});

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloak = new Keycloak({
//   "realm": "jsbelgrade",
//   "auth-server-url": "http://auth_server:8080/auth",
//   "ssl-required": "none",
//   "resource": "jsbelgrade",
//   "credentials": {
//     "secret": "0eb83b4f-d4ce-457c-9bad-0aa37cd54367"
//   },
  "store": memoryStore
});

// Install the Keycloak middleware.
//
// Specifies that the user-accessible application URL to
// logout should be mounted at /logout
//
// Specifies that Keycloak console callbacks should target the
// root URL.  Various permutations, such as /k_logout will ultimately
// be appended to the admin URL.

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/login', keycloak.protect(), function (req, res) {
  res.render('index', {
    result: JSON.parse(req.session['keycloak-token']).access_token
  });
});
