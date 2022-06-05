const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authorize = require('../middleware/authorize.js');
const database = require('../firebase/firebase-config');

const usersRef = database.collection('users');

// const users = JSON.parse(fs.readFileSync('./database/users.json'));

const hash = password => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

router.use(require('body-parser').json());
router.use(
  require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET_KEY,
  })
);

router.post('/signup', (req, res) => {
  console.log('Signup attempt');
  const username = req.body.username.toLowerCase(),
    password = req.body.password;

  if (!username || !password) {
    return res.json({ signedIn: false, message: 'no username or password' });
    // to let front end know our user is not signed in
  }

  const userList = [];
  usersRef.get().then(snapshot => {
    snapshot.forEach(doc => userList.push(doc.data()));

    // If there is a username
    if (userList.find(user => user.username === username)) {
      return res.json({ signedIn: false, message: 'username already in use' });
    }

    const userObject = {
      username: username,
      passwordHash: hash(password),
    };

    usersRef.add(userObject);

    // create and return JWT
    const token = jwt.sign(
      { username: username }, // 1. payload
      process.env.JWT_SECRET_KEY, // 2. secret key
      { expiresIn: '6h' } // 3. options
    );

    res.status(200).json({
      signedIn: true,
      message: 'Successfully logged in',
      token: token,
      user: userObject,
    });
  });
});

router.post('/signin', (req, res) => {
  console.log('Signin attempt');
  const userList = [];
  // get user list from 'users' collection (table) in firestore
  usersRef.get().then(snapshot => {
    snapshot.forEach(doc => userList.push(doc.data()));

    const username = req.body.username.toLowerCase(),
      password = req.body.password;

    if (!username || !password) {
      return res.json({ signedIn: false, message: 'no username or password' });
    }

    const user = userList.find(userObj => userObj.username === username);
    if (!user) {
      return res.json({ signedIn: false, message: 'no user with this username' });
    } else if (user) {
      if (user.passwordHash !== hash(password)) {
        return res.json({ signedIn: false, message: 'wrong username or password' });
      }
      // it is a valid password at this point, create and return JWT
      const token = jwt.sign(
        { username: username }, // 1. payload
        process.env.JWT_SECRET_KEY, // 2. secret key
        { expiresIn: '6h' } // 3. options
      );

      res.status(200).json({
        signedIn: true,
        message: 'Successfully logged in',
        token: token,
        user: user,
      });
    }
  });
});

router.post('/signout', (req, res) => {
  console.log('Signout attempt');
  delete req.session.user;
  res.json({
    signedIn: false,
    message: 'You have been signed out',
  });
});

router.get('/check-auth', authorize, (req, res) => {
  console.log('req.decoded in /users/check-auth route', req.decoded);
  // if valid token, continue
  const usernameFromToken = req.decoded.username;

  // find the user from users using username from the token
  const userList = [];
  usersRef.get().then(snapshot => {
    snapshot.forEach(doc => userList.push(doc.data()));
    const user = userList.find(userObj => userObj.username === usernameFromToken);

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    // send back username
    return res.status(200).json({
      signedIn: true,
      user: user,
    });
  });
});

module.exports = router;
