import axios from 'axios';

const apiURL = 'http://localhost:4000';
const post = (url: string, body?: any) => {
  axios.post(url, body, {
    headers: { 'Content-Type': 'application/json' },
  });
};
// const post = (url: string, body?: any) =>
//   fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(body || {}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

export const signin = (username: string, password: string) => post(apiURL + '/users/signin', { username, password });
export const signup = (username: string, password: string) => post(apiURL + '/users/signup', { username, password });
export const signout = () => post(apiURL + '/users/signout');

export const createPage = (pageTitle: string) => post(apiURL + '/page/create', pageTitle);
