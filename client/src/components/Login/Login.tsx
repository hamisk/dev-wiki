import React, { useRef } from 'react';

type Props = {
  user: any;
};

function Login({ user }: Props) {
  const usernameEl = useRef(null);
  const passwordEl = useRef(null);

  const signin = () => {
    console.log(usernameEl.current);
    console.log(passwordEl.current);
  };

  return (
    <div className='login'>
      {user ? (
        <>
          <p className='login__user'>Hi {user}</p>
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
