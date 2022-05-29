import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/Page/Page';
import Sidebar from './components/Sidebar/Sidebar';
import { database } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [userlist, setUserlist] = useState<any>([]);

  const usersCollectionRef = collection(database, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUserlist(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar user={user} setUser={setUser} />
        <Routes>
          <Route path='/page/:title' element={<Page user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
