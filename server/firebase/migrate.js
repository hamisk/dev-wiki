const fbDatabase = require('./firebase-config');
const fs = require('fs');

const localJSONDatabase = JSON.parse(fs.readFileSync('./database/database.json'));

localJSONDatabase.forEach(obj => {
  fbDatabase
    .collection('pages')
    .add({
      id: obj.id,
      pageTitle: obj.pageTitle,
      sections: obj.sections,
    })
    .then(docRef => {
      console.log('Doc written with id: ', docRef.id);
    })
    .catch(err => {
      console.log('Error adding doc: ', err);
    });
});
