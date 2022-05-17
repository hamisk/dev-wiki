const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.use(require('body-parser').json());

router.post('/create', (req, res) => {
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  const pageTitle = req.body.pageTitle;
  if (database.find(obj => obj.pageTitle === pageTitle)) {
    return res.status(400).json({ createdPage: false, message: 'Page already exists' });
  }
  const pageObject = {
    id: uuidv4(),
    pageTitle: pageTitle,
  };

  database.push(pageObject);
  fs.writeFileSync('./database/database.json', JSON.stringify(database));
  res.status(200).json({ createdPage: true, page: pageObject });
});

router.get('/all', (req, res) => {
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  res.status(200).json({ pages: database });
});

router.get('/:title', (req, res) => {
  let { title } = req.params;
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  const page = database.find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === title);
  res.status(200).json({ page: page });
});

module.exports = router;
