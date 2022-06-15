import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/Page/Page';
import Sidebar from './components/Sidebar/Sidebar';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collapseSide, setCollapseSide] = useState<boolean>(false);

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
        <Sidebar user={user} setUser={setUser} collapseSide={collapseSide} />
        <Routes>
          <Route path='/page/:title' element={<Page user={user} collapseSide={collapseSide} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
