import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [user, setUser] = useState('');

  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <Routes>{/* <Route path='/page/:id' element={<Page />} /> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
