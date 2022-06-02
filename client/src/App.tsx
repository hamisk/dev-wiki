import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/Page/Page';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [user, setUser] = useState(null);

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
