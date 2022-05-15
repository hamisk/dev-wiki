import React from 'react';
import Login from '../Login/Login';

type Props = {
  user: any;
  setUser: any;
};

function Sidebar({ user, setUser }: Props) {
  return (
    <div className='row'>
      <div className='three-columns'>
        <h1>Dev Wiki</h1>
        <Login user={user} setUser={setUser} />
        Login PageList
      </div>
      <div className='nine-columns'></div>
    </div>
  );
}

export default Sidebar;
