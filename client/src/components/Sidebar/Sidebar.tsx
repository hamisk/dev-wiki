import React from 'react';
import Login from '../Login/Login';
import PageList from '../PageList/PageList';
import './SideBar.scss';
import dwLogo from '../../assets/logo/dw-wiki.png';

type Props = {
  user: any;
  setUser: any;
  collapseSide: boolean;
};

function Sidebar({ user, setUser, collapseSide }: Props) {
  let sidebarClass = 'sidebar';
  if (collapseSide) {
    sidebarClass = 'sidebar collapsed';
  }

  return (
    <div className={sidebarClass}>
      <img src={dwLogo} alt='dev wiki logo' className='sidebar__logo' />
      <div className='sidebar__login'>
        <h1 className='sidebar__title'>Dev Wiki</h1>
        <Login user={user} setUser={setUser} />
      </div>
      <div className='sidebar__wrapper'>
        <PageList user={user} />
      </div>
    </div>
  );
}

export default Sidebar;
