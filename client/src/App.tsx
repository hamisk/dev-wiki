import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/Page/Page';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar user={user} setUser={setUser} />
        <Routes>
          <Route path='/page/:title' element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
