import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [user, setUser] = useState('');

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>{/* <Route path='/page/:id' element={<Page />} /> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
