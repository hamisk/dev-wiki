const apiURL = 'http://localhost:4000';
const post = (url: string, body?: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body || {}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const signin = (username: string, password: string) => post(apiURL + '/users/signin', { username, password });
export const signup = (username: string, password: string) => post(apiURL + '/users/signup', { username, password });
export const signout = () => post(apiURL + '/users/signout');
