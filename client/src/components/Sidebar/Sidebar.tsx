import React from 'react';
import Login from '../Login/Login';
import PageList from '../PageList/PageList';

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
        <PageList user={user} />
      </div>
      <div className='nine-columns'></div>
    </div>
  );
}

export default Sidebar;
