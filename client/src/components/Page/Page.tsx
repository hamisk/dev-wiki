import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const apiURL = 'http://localhost:4000';

type Props = {
  user: any;
};

function Page({ user }: Props) {
  const [page, setPage] = useState<any>([]);
  const [sections, setSections] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios.get(apiURL + '/page/' + params.title).then(res => {
      setPage(res.data.page);
      setSections(res.data.page.contents.sections);
    });
  }, [params]);

  const addSection = () => {};

  return (
    <div>
      <h1 className='page__title'>{page.pageTitle || 'loading'}</h1>
      {user ? (
        <button className='page__button' onClick={addSection}>
          Add Section
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default Page;
