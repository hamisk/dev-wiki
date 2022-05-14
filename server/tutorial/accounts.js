const Firebase = require('firebase');
const crypto = require('crypto');

const firebase = new Firebase('https://dev-wiki-57987-default-rtdb.firebaseio.com/');
const users = firebase.child('users');
// Firebase stores data in json, and gives access to sub objects
// within the data structure via child(key)

const hash = password => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

const router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(
  require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'longrandomstringofmychoosingthatwillbeusedasthesecret',
  })
);

router.post('/api/signup', (req, res) => {
  const username = req.body.username,
    password = req.body.password;

  if (!username || !password) {
    return res.json({ signedIn: false, message: 'no username or password' });
    // to let front end know our user is not signed in
  }

  // If there is a username
  users.child(username).once('value', snapshot => {
    if (snapshot.exists()) {
      // we already have a user with this account name
      return res.json({ signedIn: false, message: 'username already in use' });
    }

    const userObject = {
      username: username,
      passwordHash: hash(password),
    };

    users.child(username).set(userObject);
    req.session.user = userObject;

    res.json({ signedIn: true, user: userObject });
  });
  // above is a firebase method
  // when we pass username to the child method of users, we're creating/fetching a subchild
  // if child doesn't exist, it gets created, if it does exist - we're getting reference to the username key, inside the users object
  // in signup route, we're creating a user account if it doesn't exist
  // so first check if user does exist
  // how we access data in firebase:
  // we can access the values of any of these properties within firebase by listening for events
  // .once() method, listen for the 'value' event
  // we're assigning this callback to the value event
  // this callback will be called immediately upon registering of this callback function
  // then anytime the value of our username reference changes, it will call this callback again
  // that's the behaviour of the .on() method
  // this event would be called every time the value occurs for this username
  // with .once() - this only happens once, the first time, which is whatever the value is now
  // so we're going to call this callback fn once
  // firebase callback functions receive a snapshot as a value
});

router.post('/api/signin', (req, res) => {
  const username = req.body.username,
    password = req.body.password;

  if (!username || !password) {
    return res.json({ signedIn: false, message: 'no username or password' });
  }

  users.child(username).once('value', snapshot => {
    if (!snapshot.exists() || snapshot.child('passwordHash').val() !== hash(password)) {
      return res.json({ signedIn: false, message: 'wrong username or password' });
    }

    const user = snapshot.exportVal();

    req.session.user = user;
    res.json({ signedIn: true, user: user });
  });
});

router.post('api/signout', (req, res) => {
  delete req.session.user;
  res.json({
    signedIn: false,
    message: 'You have been signed out',
  });
});

module.exports = router;
