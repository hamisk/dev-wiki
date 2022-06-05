const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.use(require('body-parser').json());

const database = require('../firebase/firebase-config');
const pagesRef = database.collection('pages');

router.post('/create', (req, res) => {
  // const database = JSON.parse(fs.readFileSync('./database/database.json'));
  const pageTitle = req.body.pageTitle;
  const pageList = [];
  pagesRef.get().then(snapshot => {
    snapshot.forEach(doc => pageList.push(doc.data()));
    if (pageList.find(obj => obj.pageTitle === pageTitle)) {
      return res.status(400).json({ createdPage: false, message: 'Page already exists' });
    }
    const pageObject = {
      id: uuidv4(),
      pageTitle: pageTitle,
      sections: [{ sectionId: 0, content: 'new page content' }],
    };

    pagesRef.add(pageObject);
    // database.push(pageObject);
    // fs.writeFileSync('./database/database.json', JSON.stringify(database));
    res.status(200).json({ createdPage: true, page: pageObject });
  });
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

router.post('/editor/:title/sections/:sectionId', (req, res) => {
  // When user clicks on section to edit - add editor to section
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  // console.log(req.body.username);
  // console.log(req.params.title);
  // console.log(req.params.sectionId);
  const username = req.body.username;
  const pageTitle = req.params.title;
  const sectionId = Number(req.params.sectionId);

  database
    .find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === pageTitle)
    .sections.find(obj => obj.sectionId === sectionId).editor = username;

  fs.writeFileSync('./database/database.json', JSON.stringify(database));
  res.status(200).json({ addedEditor: true, page: pageTitle, section: sectionId, editor: username });
});

router.post('/save/:title/sections/:sectionId', (req, res) => {
  console.log('save route');
  console.log(req.body);
  const database = JSON.parse(fs.readFileSync('./database/database.json'));
  const content = req.body.content;
  const pageTitle = req.params.title;
  const sectionId = Number(req.params.sectionId);
  // console.log(content);
  // console.log(pageTitle);
  // console.log(sectionId);

  // update existing section
  if (
    database
      .find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === pageTitle)
      .sections.find(obj => obj.sectionId === sectionId)
  ) {
    database
      .find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === pageTitle)
      .sections.find(obj => obj.sectionId === sectionId).content = content;
  } else {
    database.find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === pageTitle).sections[sectionId] = {
      sectionId: sectionId,
      content: content,
    };
  }

  database
    .find(obj => obj.pageTitle.replace(/\s+/g, '-').toLowerCase() === pageTitle)
    .sections.find(obj => obj.sectionId === sectionId).editor = null;

  fs.writeFileSync('./database/database.json', JSON.stringify(database));
  res.status(200).json({ savedEdits: true, page: pageTitle, section: sectionId });
});

module.exports = router;
