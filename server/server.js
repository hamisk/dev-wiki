const express = require('express');

express()
  .set('view engine', 'ejs')
  // what's ejs?
  .use(express.static('./public'))
  .use(require('./accounts'))
  .get('*', (req, res) => {
    res.render('index', {
      user: JSON.stringify(req.session.user || null),
    });
  })
  .listen(3000);
