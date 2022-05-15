import axios from 'axios';
import React, { useState } from 'react';
import * as API from '../../api';
const apiURL = 'http://localhost:4000';

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
    console.log(newPageTitle);
    axios
      .post(apiURL + '/page/create', { pageTitle: newPageTitle })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
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
