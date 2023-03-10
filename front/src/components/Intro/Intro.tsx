import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { signInUser } from '../../dummy/users';

const Intro = () => {
  const { login } = useAuth();
  return (
    <div>
      <button onClick={() => login(signInUser)}>로그인</button>
    </div>
  );
};

export default Intro;
