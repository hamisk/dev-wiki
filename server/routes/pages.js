const router = require('express').Router();
const fs = require('fs');

const database = JSON.parse(fs.readFileSync('./database/database.json'));
router.use(require('body-parser').json());

router.post('/create', (req, res) => {
  const pageTitle = req.body.pageTitle;
  const pageObject = {
    pageTitle: pageTitle,
    content: '',
  };

  database.push(pageObject);
  fs.writeFileSync('./database/database.json', JSON.stringify(database));
  res.json({ createdPage: true, page: pageObject });
});

module.exports = router;
