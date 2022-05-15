import React, { useRef } from 'react';
import * as API from '../../api';

type Props = {
  user: any;
  setUser: any;
};

function Login({ user, setUser }: Props) {
  const usernameEl = useRef<HTMLInputElement | null>(null);
  const passwordEl = useRef<HTMLInputElement | null>(null);

  const signin = () => {
    if (usernameEl.current && passwordEl.current) {
      const username = usernameEl.current.value;
      const password = passwordEl.current.value;

      API.signin(username, password).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            setUser(json.user);
          });
        }
        // setUser(res.data.user)
      });
    }
  };

  const signout = () => {
    API.signout().then(response => setUser(null));
  };

  const signup = () => {
    if (usernameEl.current && passwordEl.current) {
      const username = usernameEl.current.value;
      const password = passwordEl.current.value;

      API.signup(username, password).then(response => {
        console.log(response);
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            setUser(json.user);
          });
        }
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
