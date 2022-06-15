import axios from 'axios';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, User } from '../../types';
import './PageList.scss';
const apiURL = 'http://localhost:4000';

type Props = {
  user: User | null;
};

function PageList({ user }: Props) {
  const [newPageTitle, setNewPageTitle] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    getPages();
  }, [loaded]);

  const getPages: VoidFunction = () => {
    axios
      .get(apiURL + '/page/all')
      .then(res => {
        setPages(res.data.pages || []);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  };

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPageTitle(e.target.value);
  };

  const createPage = (e: React.KeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key !== 'Enter') return;
    axios
      .post(apiURL + '/page/create', { pageTitle: newPageTitle })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setNewPageTitle('');
    target.value = '';
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
            {pages.map(page => (
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
