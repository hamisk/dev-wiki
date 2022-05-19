import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../api';
const apiURL = 'http://localhost:4000';

type Props = {
  user: any;
};

function PageList({ user }: Props) {
  const [newPageTitle, setNewPageTitle] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    getPages();
  }, [loaded]);

  const getPages = () => {
    axios
      .get(apiURL + '/page/all')
      .then(res => {
        setPages(res.data.pages || []);
        setLoaded(true);
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  };

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
    e.target.value = '';
    // variable loaded added to dependency array of useEffect to trigger rerender when loaded changes value
    // changing loaded value after creating a page so useEffect detects change and re-fetches page list
    setLoaded(false);
  };

  return (
    <div className='pagelist'>
      <div className='pagelist__new-page'>
        {user ? (
          <input
            type='text'
            className='pagelist__input'
            placeholder='New Page Title'
            onChange={update}
            onKeyPress={createPage}
          />
        ) : null}
        <p>{newPageTitle}</p>
      </div>
      <div className='pagelist__list'>
        {loaded ? (
          <ul className='pagelist__ul'>
            {pages.map((page: any) => (
              <li className='pagelist__list-item' key={page.id}>
                <Link to={`/page/${page.pageTitle.replace(/\s+/g, '-').toLowerCase()}`}>{page.pageTitle}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <li>loading</li>
        )}
      </div>
    </div>
  );
}

export default PageList;
