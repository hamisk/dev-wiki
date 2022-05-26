const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

const authorize = require('../middleware/authorize');

const users = JSON.parse(fs.readFileSync('./database/users.json'));

const hash = password => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

router.use(require('body-parser').json());
router.use(
  require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'longrandomstringofmychoosingthatwillbeusedasthesecret',
  })
);

router.post('/signup', (req, res) => {
  console.log('Signup attempt');
  console.log(req.body);
  const username = req.body.username,
    password = req.body.password;

  if (!username || !password) {
    return res.json({ signedIn: false, message: 'no username or password' });
    // to let front end know our user is not signed in
  }

  // If there is a username
  if (users.find(user => user.username === username)) {
    return res.json({ signedIn: false, message: 'username already in use' });
  }

  const userObject = {
    username: username,
    passwordHash: hash(password),
  };

  users.push(userObject);
  fs.writeFileSync('./database/users.json', JSON.stringify(users));
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
  });
});

router.post('/signin', (req, res) => {
  console.log('Signin attempt');
  const username = req.body.username,
    password = req.body.password;

  if (!username || !password) {
    return res.json({ signedIn: false, message: 'no username or password' });
  }

  const user = users.find(userObj => userObj.username === username);
  if (user) {
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
    });
  }
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
  const user = users.find(userObj => userObj.username === usernameFromToken);

  if (!user) {
    return res.status(400).json({
      message: 'User does not exist',
    });
  }

  // send back username
  return res.status(200).json({
    username: user.username,
  });
});

module.exports = router;
