import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    });
  }, [params]);

  const addSection = (e: any) => {
    const newSections = sections.slice();
    // .slice() to create a copy but change reference, so setSection picks up on the change
    let id;

    if (!sections) {
      id = 1;
      return setSections([{ sectionId: id, content: 'new content here' }]);
    } else {
      id = Math.max(...sections.map((o: any) => o.sectionId)) + 1;
    }

    newSections[id] = {
      sectionId: id,
      content: 'new content here',
      editor: user.username,
    };

    return setSections(newSections);
  };

  return (
    <div className='page'>
      <h1 className='page__title'>{page.pageTitle || 'loading'}</h1>
      {sections &&
        sections.map((section: any) => (
          <Section
            section={section}
            key={section.sectionId * 7}
            user={user}
            path={params.title + '/sections/' + section.sectionId}
          />
        ))}
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
