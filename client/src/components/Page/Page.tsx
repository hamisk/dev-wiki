import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../Section/Section';
import './Page.scss';
const apiURL = 'http://localhost:4000';

type Props = {
  user: any;
  collapseSide: boolean;
};

function Page({ user, collapseSide }: Props) {
  const [page, setPage] = useState<any>([]);
  const [sections, setSections] = useState<any>([]);
  const [editPage, setEditPage] = useState<boolean>(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const params = useParams();

  let pageClass = 'page';
  if (collapseSide) {
    pageClass = 'page page-collapsed';
  }

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

  const update = (evt: any) => {
    setNewPageTitle(evt.target.value);
  };

  const savePageTitle = (e: any) => {
    setEditPage(false);
    axios
      .put(apiURL + '/page/editTitle/' + params.title, { pageTitle: newPageTitle })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    // setNewPageTitle('');
    // e.target.value = '';
    window.location.href = `/page/${newPageTitle.replace(/\s+/g, '-').toLowerCase()}`;
  };

  return (
    <div className={pageClass}>
      <div className='page__title-wrapper' onClick={() => setEditPage(true)}>
        {editPage ? (
          <textarea
            autoFocus
            className='page__edit-title'
            defaultValue={page.pageTitle}
            onChange={update}
            onBlur={savePageTitle}
          />
        ) : (
          <h1 className='page__title'>{page.pageTitle || 'loading'}</h1>
        )}
      </div>
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
