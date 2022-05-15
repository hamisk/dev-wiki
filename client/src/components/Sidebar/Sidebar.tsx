import React from 'react';
import Login from '../Login/Login';
import PageList from '../PageList/PageList';
import './SideBar.scss';

type Props = {
  user: any;
  setUser: any;
};

function Sidebar({ user, setUser }: Props) {
  return (
    <div className='sidebar'>
      <div className='sidebar__login'>
        <h1>Dev Wiki</h1>
        <Login user={user} setUser={setUser} />
        <PageList user={user} />
      </div>
      <div className='sidebar__wrapper'></div>
    </div>
  );
}

export default Sidebar;
