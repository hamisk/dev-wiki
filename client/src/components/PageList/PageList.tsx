import React, { useState } from 'react';
import * as API from '../../api';

type Props = {
  user: any;
};

function PageList({ user }: Props) {
  const [newPageTitle, setNewPageTitle] = useState('');

  const update = (evt: any) => {
    console.log(evt.target.value);
    setNewPageTitle(evt.target.value);
  };

  const createPage = (e: any) => {
    if (e.charCode !== 13) return;
    API.createPage(newPageTitle);
    setNewPageTitle('');
  };

  return (
    <div>
      {user ? (
        <input
          type='text'
          className='pagelist__input'
          // value={newPageTitle}
          placeholder='New Page Title'
          onChange={update}
          onKeyPress={createPage}
        />
      ) : null}
      <p>{newPageTitle}</p>
    </div>
  );
}

export default PageList;
