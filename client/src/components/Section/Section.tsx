import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Section.scss';

const apiURL = 'http://localhost:4000';

type Props = {
  section: any;
  user: any;
  path: any;
};

function Section({ section, user, path }: Props) {
  const [content, setContent] = useState(section.content);
  const [editing, setEditing] = useState<boolean>(user && user.username === section.editor);
  // editing = boolean: user - to see if a user is currently logged in
  // user.username === section.editor
  // new sections have an editor assigned when created - the current user who created it
  // when user clicks on a section, they become editor for that section, so that they can edit it
  // editing - tells us whether or not the current user is editing
  // we use this to decide whether content is rendered into html, or as markdown in a textbox to be edited
  const [locked, setLocked] = useState<boolean>(user && section.editor && user.username !== section.editor);

  useEffect(() => {
    makeLinks(content, (content: any) => setContent(content));
  }, []);

  const startEditing = (e: any) => {
    if (e.target.tagName === 'A') {
      //don't want to enable editing if user just clicking a link

      return;
    }
    // don't run this function if we don't have a logged in user, or if they're already editing
    if (!user || editing || locked) return;

    setEditing(true);

    // also need to store in the database that the current user is now the editor of this section
    // to let other users know that it's currently being edited, so they can't edit it
    // console.log(path);
    axios
      .post(
        apiURL + '/page/editor/' + path,
        { username: user.username },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(res => {
        // console.log(res.data);
      });
  };

  const updateContent = (e: any) => {
    setContent(e.target.value);
  };

  const save = () => {
    // onBlur is an event handler that checks for when element is no longer in focus
    setEditing(false);
    axios
      .post(
        apiURL + '/page/save/' + path,
        { content: content || null }, // If content is empty, ie if user removes content, then null is sent to database to store in section
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(res => {
        // console.log(res.data);
      });
  };

  let classes = ['section__editing'];
  if (editing) classes.push('editing');
  if (user) classes.push(locked ? 'locked' : 'editable');
  // Section should highlight grey when hovering over to indicate that section is editable

  const makeLinks = (html: any, callbackFn: any) => {
    // use [[link]] syntax to generate links to internal pages
    // will need to fetch list of pages
    const anchor = /\[\[(.*)\]\]/g; // regex that matches [[ ]]
    axios
      .get(apiURL + '/page/all')
      .then(res => {
        let pages = res.data.pages;

        callbackFn(
          html.replace(anchor, (match: any, anchorText: any) => {
            // loop through pages to find page that matches anchorText
            for (let page of pages) {
              if (page.title === anchorText.trim()) {
                return `<a href="/page/${anchorText.trim()}">${anchorText}</a>`;
              }
            }
          })
        );
      })
      .catch(err => console.log(err));
  };

  return (
    <section className='section' onClick={startEditing}>
      {editing ? (
        <textarea className={classes.join(' ')} defaultValue={content} onChange={updateContent} onBlur={save} />
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </section>
  );
}

export default Section;
