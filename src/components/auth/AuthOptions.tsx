import React from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const AuthOptions = () => {
  const { userData, setUserData } = React.useContext(UserContext);

  const history = useHistory();

  const signUp = () => history.push('/signup');
  const logIn = () => history.push('/login');
  const logOut = () => {
    if (setUserData) {
      setUserData({
        token: undefined,
        user: undefined,
      });
    }
    localStorage.setItem('auth-token', '');
  };
  return (
    <nav>
      {userData.user ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={logIn}>Log In</button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
