const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.use(require('body-parser').json());

const database = require('../firebase/firebase-config');
const pagesRef = database.collection('pages');

router.post('/create', (req, res) => {
  const pageTitle = req.body.pageTitle.replace(/\s+/g, '-').toLowerCase();
  const pageList = [];
  pagesRef.get().then(snapshot => {
    snapshot.forEach(doc => pageList.push(doc.data()));
    if (pageList.find(obj => obj.pageTitle === pageTitle)) {
      return res.status(400).json({ createdPage: false, message: 'Page already exists' });
    }
    const pageObject = {
      id: uuidv4(),
      pageTitle: pageTitle,
    };

    pagesRef.doc(pageTitle).set(pageObject);
    database
      .collection('pages')
      .doc(pageTitle)
      .collection('sections')
      .doc(String(0))
      .set({ sectionId: 0, content: 'new page content' });
    res.status(200).json({ createdPage: true, page: pageObject });
  });
});

router.get('/all', (_req, res) => {
  const pageList = [];
  pagesRef.get().then(snapshot => {
    snapshot.forEach(doc => pageList.push(doc.data()));
    res.status(200).json({ pages: pageList });
  });
});

router.get('/:title', (req, res) => {
  let { title } = req.params;

  // initialise page object
  // sections are stored in subcollections of each page
  // fetch and iterate through to build array of sections to pass to front end
  let page = {};
  database
    .collection('pages')
    .doc(title)
    .get()
    .then(doc => (page = doc.data()))
    .then(
      database
        .collection('pages')
        .doc(title)
        .collection('sections')
        .get()
        .then(snapshot => {
          page.sections = [];
          snapshot.forEach(doc => page.sections.push(doc.data()));
          res.status(200).json({ page: page });
        })
    );
});

router.put('/editTitle/:title', (req, res) => {
  const pageTitle = req.body.pageTitle.replace(/\s+/g, '-').toLowerCase();
  const pageDocId = req.params.title;
  console.log(pageTitle);
  console.log(pageDocId);
  const pageList = [];

  pagesRef.get().then(snapshot => {
    snapshot.forEach(doc => pageList.push(doc.data()));
    if (pageList.find(obj => obj.pageTitle === pageTitle)) {
      return res.status(400).json({ editedPageTitle: false, message: 'Page title already exists' });
    }

    pagesRef
      .doc(pageDocId)
      .get()
      .then(doc => {
        pagesRef.doc(pageTitle).set(doc.data());
      });
    res.status(200);

    // pagesRef.doc(pageTitle).set(pageObject);
    // database
    //   .collection('pages')
    //   .doc(pageTitle)
    //   .collection('sections')
    //   .doc(String(0))
    //   .set({ sectionId: 0, content: 'new page content' });
    // res.status(200).json({ createdPage: true, page: pageObject });
  });

  res.status(200);
  // will need to send request to navigate to new pageId address on front end
});

router.put('/editor/:title/sections/:sectionId', (req, res) => {
  // When user clicks on section to edit - add editor to section
  const username = req.body.username;
  const pageTitle = req.params.title;
  const sectionId = Number(req.params.sectionId);

  // to do - add editor when editing, and add event listener to front end
  // database.collection('pages').doc(pageTitle).collection('sections').doc(String(sectionId)).set({
  //   sectionId: sectionId,
  //   content: content,
  // });
  res.status(200).json({ addedEditor: true, page: pageTitle, section: sectionId, editor: username });
});

router.put('/save/:title/sections/:sectionId', (req, res) => {
  console.log('save route');
  // console.log(req.body);

  const content = req.body.content;
  const pageTitle = req.params.title.replace(/\s+/g, '-').toLowerCase();
  const sectionId = Number(req.params.sectionId);

  database.collection('pages').doc(pageTitle).collection('sections').doc(String(sectionId)).set({
    sectionId: sectionId,
    content: content,
  });

  res.status(200).json({ savedEdits: true, page: pageTitle, section: sectionId });
});

module.exports = router;
