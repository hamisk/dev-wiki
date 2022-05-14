import Firebase from 'firebase';

const post = (url: string, body?: any) =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body || {}),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export const signin = (username, password) => post('api/signin', { username, password });
export const signup = (username, password) => post('api/signup', { username, password });
export const signout = () => post('/api/signout');

export const pages = new Firebase('https://dev-wiki-57987-default-rtdb.firebaseio.com/pages');
