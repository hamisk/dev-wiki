import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { arrayBuffer } from 'stream/consumers';
import Section from '../Section/Section';
import './Page.scss';
const apiURL = 'http://localhost:4000';

type Props = {
  user: any;
};

function Page({ user }: Props) {
  const [page, setPage] = useState<any>([]);
  const [sections, setSections] = useState<any>([]);
  const params = useParams();

  useEffect(() => {
    axios.get(apiURL + '/page/' + params.title).then(res => {
      setPage(res.data.page);
      setSections(res.data.page.sections);
      // console.log(res.data.page);
    });
  }, [params, page]);

  const addSection = (e: any) => {
    let id;

    if (!sections) {
      id = 1;
      setSections({});
    } else {
      id = Math.max(...sections.map((o: any) => o.sectionId)) + 1;
    }

    sections[id] = {
      editor: user.username,
    };

    setSections(sections);
  };

  return (
    <div className='page'>
      <h1 className='page__title'>{page.pageTitle || 'loading'}</h1>
      {sections
        ? sections.map((section: any) => {
            return (
              <Section
                section={section}
                key={section.sectionId}
                user={user}
                path={params.title + '/sections/' + section.sectionId}
              />
            );
          })
        : ''}
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
