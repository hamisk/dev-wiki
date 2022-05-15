const router = require('express').Router();
const crypto = require('crypto');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./database/users.json'));

const hash = password => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(
  require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'longrandomstringofmychoosingthatwillbeusedasthesecret',
  })
);

router.post('/signup', (req, res) => {
  console.log('Signup attempt');
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
  req.session.user = userObject;
  res.json({ signedIn: true, user: userObject });
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
    req.session.user = user;
    res.json({ signedIn: true, user: user });
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

module.exports = router;
