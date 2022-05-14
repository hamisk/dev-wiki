import React from 'react';
import Login from '../Login/Login';

type Props = {
  user: any;
};

function Sidebar({ user }: Props) {
  return (
    <div className='row'>
      <div className='three-columns'>
        <h1>Dev Wiki</h1>
        <Login user={user} />
        Login PageList
      </div>
      <div className='nine-columns'></div>
    </div>
  );
}

export default Sidebar;
