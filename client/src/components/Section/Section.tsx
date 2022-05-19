import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Section.scss';

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

  const startEditing = (e: any) => {
    // don't run this function if we don't have a logged in user, or if they're already editing
    if (!user || editing) return;

    setEditing(true);

    // also need to store in the database that the current user is now the editor of this section
    // to let other users know that it's currently being edited, so they can't edit it
    console.log(path);
  };
  // console.log(user.username === section.editor);
  console.log(user);
  // console.log(section.editor);

  console.log(editing);

  return (
    <section className='section' onClick={startEditing}>
      {editing ? (
        <textarea className='section__editing' defaultValue={content} />
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </section>
  );
}

export default Section;