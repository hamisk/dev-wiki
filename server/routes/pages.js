const router = require('express').Router();
const fs = require('fs');

router.use(require('body-parser').json());

router.post('/create', (req, res) => {
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  const pageTitle = req.body.pageTitle;
  const pageObject = {
    pageTitle: pageTitle,
    content: '',
  };

  database.push(pageObject);
  fs.writeFileSync('./database/database.json', JSON.stringify(database));
  res.json({ createdPage: true, page: pageObject });
  console.log('end post');
});

module.exports = router;
