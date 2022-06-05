// Using firebase admin

// write data
const citiesRef = db.collection('cities');

await citiesRef.doc('SF').set({
  name: 'San Francisco',
  state: 'CA',
  country: 'USA',
  capital: false,
  population: 860000,
});

// get a document
const cityRef = db.collection('cities').doc('SF');
const doc = await cityRef.get();
if (!doc.exists) {
  console.log('No such document!');
} else {
  console.log('Document data:', doc.data());
}

// get multiple documents in one query
const citiesRef2 = db.collection('cities');
const snapshot = await citiesRef.where('capital', '==', true).get();
if (snapshot.empty) {
  console.log('No matching documents.');
  // return;
}

snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});

// get all documents in a collection
const citiesRef3 = db.collection('cities');
const snapshot1 = await citiesRef.get();
snapshot1.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});

// list subcollections of a document
const sfRef = db.collection('cities').doc('SF');
const collections = await sfRef.listCollections();
collections.forEach(collection => {
  console.log('Found subcollection with id:', collection.id);
});

// You can listen to a document with the onSnapshot() method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.
const doc1 = db.collection('cities').doc('SF');

const observer = doc1.onSnapshot(
  docSnapshot => {
    console.log(`Received doc snapshot: ${docSnapshot}`);
    // ...
  },
  err => {
    console.log(`Encountered error: ${err}`);
  }
);

// Update fields in nested objects
// If your document contains nested objects, you can use "dot notation" to reference
// nested fields within the document when you call update():
const initialData = {
  name: 'Frank',
  age: 12,
  favorites: {
    food: 'Pizza',
    color: 'Blue',
    subject: 'recess',
  },
};

// ...
const res = await db.collection('users').doc('Frank').update({
  age: 13,
  'favorites.color': 'Red',
});

// syntax for fetching users from firebase
async function getUsers() {
  try {
    let userList = [];
    const usersSnapshot = await usersRef.get();
    usersSnapshot.forEach(doc => {
      userList.push(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
}
