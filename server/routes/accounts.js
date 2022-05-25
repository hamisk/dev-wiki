const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

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
    // it is a valid password at this point,
    // create and return JWT
    const token = jwt.sign(
      // 1. payload
      { username: username },
      // 2. secret key
      process.env.JWT_SECRET_KEY,
      // 3. options
      { expiresIn: '6h' }
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

module.exports = router;

// const bcrypt = require('bcrypt');
// const salt = 10;

// exports.createUser = (req, res) => {
//   // const name = req.body.name;
//   // const username = req.body.username;
//   // const password = req.body.password;
//   const { name, username, password, carbon, city, country } = req.body;

//   if (!name || !username || !password || !carbon) {
//     return res.status(400).json({
//       message: 'Register requires name, username, and password',
//     });
//   }

//   // at this point, we are guaranteed to have a
//   // name, username, and password

//   bcrypt.hash(password, salt, function (err, hashedPassword) {
//     const newUser = {
//       name: name,
//       username: username,
//       password: hashedPassword,
//       city: city,
//       country: country,
//       goal_carbon: carbon,
//     };

//     console.log(newUser);

//     knex('users')
//       .insert(newUser)
//       .then(() => {
//         // create and return JWT
//         const token = jwt.sign(
//           // 1. payload
//           { username: username },
//           // 2. secret key
//           process.env.JWT_SECRET_KEY,
//           // 3. options
//           { expiresIn: '6h' }
//         );

//         res.status(200).json({
//           message: 'Successfully registered',
//           token: token,
//         });
//       })
//       .catch(err => res.status(400).send(`Error registering: ${err}`));
//   });
// };

// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({
//       message: 'Login requires username and password fields',
//     });
//   }

//   // username and password are provided
//   knex('users')
//     .where({ username: username })
//     .then(user => {
//       const foundUser = user[0];
//       // console.log(user)
//       // console.log(foundUser)

//       if (!foundUser) {
//         return res.status(400).json({
//           message: 'User does not exist',
//         });
//       }

//       // we are guaranteed to have the user here
//       // Validate password matches user's password
//       bcrypt.compare(password, foundUser.password, (err, result) => {
//         if (!result) {
//           // invalid password, return response
//           return res.status(403).json({
//             message: 'Invalid Credentials, password does not match',
//           });
//         }

//         // it is a valid password at this point,
//         // create and return JWT
//         const token = jwt.sign(
//           // 1. payload
//           { username: username },
//           // 2. secret key
//           process.env.JWT_SECRET_KEY,
//           // 3. options
//           { expiresIn: '6h' }
//         );

//         res.status(200).json({
//           message: 'Successfully logged in',
//           token: token,
//         });
//       });
//     })
//     .catch(err => res.status(400).send(`Error retrieving user: ${err}`));
// };
