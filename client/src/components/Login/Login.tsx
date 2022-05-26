import React, { useEffect, useRef } from 'react';
import axios from 'axios';
const apiURL = 'http://localhost:4000';

type Props = {
  user: any;
  setUser: any;
};

function Login({ user, setUser }: Props) {
  const usernameEl = useRef<HTMLInputElement | null>(null);
  const passwordEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Check auth
    let token = sessionStorage.getItem('authToken');
    if (!!token) {
      axios
        .get(`${apiURL}/auth/check-auth`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  const signin = () => {
    if (usernameEl.current && passwordEl.current) {
      const username = usernameEl.current.value;
      const password = passwordEl.current.value;
      axios
        .post(apiURL + '/users/signin', { username, password }, { headers: { 'Content-Type': 'application/json' } })
        .then(res => {
          setUser(res.data.user);
        });
    }
  };

  const signout = () => {
    axios.post(apiURL + '/users/signout').then(res => console.log(res.data));
    sessionStorage.removeItem('authToken');
    setUser(null);
  };

  const signup = () => {
    if (usernameEl.current && passwordEl.current) {
      const username = usernameEl.current.value;
      const password = passwordEl.current.value;
      axios
        .post(apiURL + '/users/signup', { username, password }, { headers: { 'Content-Type': 'application/json' } })
        .then(res => {
          setUser(res.data.user);
          let token = res.data.token;
          sessionStorage.setItem('authToken', token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className='login'>
      {user ? (
        <>
          <p className='login__user'>Hi {user.username}</p>
          <button className='login__button' onClick={signout}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <input type='text' className='login__input' placeholder='Username' ref={usernameEl} />
          <input type='password' className='login__input' placeholder='Password' ref={passwordEl} />
          <button className='login__button' onClick={signin}>
            Sign In
          </button>
          <button className='login__button' onClick={signup}>
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}

export default Login;

// signOut = () => {
//   // Change location to /logout server route while passing it
//   // the URL for redirecting back to a client
//   sessionStorage.removeItem('authToken')
//   const url = `${window.location.protocol}//${window.location.host}`;
//   window.location = `${API_URL}/auth/logout?from=${url}`;
// };
