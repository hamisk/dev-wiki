import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/Page/Page';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [user, setUser] = useState(null);
  const [collapseSide, setCollapseSide] = useState(false);

  return (
    <div className='App'>
      <button
        className='collapse'
        onClick={() => {
          setCollapseSide(!collapseSide);
        }}>
        collapse
      </button>
      <BrowserRouter>
        <Sidebar user={user} setUser={setUser} collapseSide={collapseSide} setCollapseSide={setCollapseSide} />
        <Routes>
          <Route path='/page/:title' element={<Page user={user} collapseSide={collapseSide} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
