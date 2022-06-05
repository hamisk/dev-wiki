const fbDatabase = require('./firebase-config');
const fs = require('fs');

const localJSONDatabase = JSON.parse(fs.readFileSync('./database/database.json'));

localJSONDatabase.forEach(obj => {
  fbDatabase.collection('pages').doc(obj.pageTitle.replace(/\s+/g, '-').toLowerCase()).set({
    id: obj.id,
    pageTitle: obj.pageTitle,
  });
  obj.sections.forEach(section => {
    fbDatabase
      .collection('pages')
      .doc(obj.pageTitle.replace(/\s+/g, '-').toLowerCase())
      .collection('sections')
      .doc(String(section.sectionId))
      .set(section);
  });
});

// add doc with random generate doc id
// localJSONDatabase.forEach(obj => {
//   fbDatabase
//     .collection('pages')

//     .add({
//       id: obj.id,
//       pageTitle: obj.pageTitle,
//       sections: obj.sections,
//     })
//     .then(docRef => {
//       console.log('Doc written with id: ', docRef.id);
//     })
//     .catch(err => {
//       console.log('Error adding doc: ', err);
//     });
// });
