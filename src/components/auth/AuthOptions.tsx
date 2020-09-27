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
        <button
          className="cursor-pointer bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={logOut}
        >
          Log out
        </button>
      ) : (
        <>
          <button
            className="cursor-pointer text-white hover:text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={signUp}
          >
            Sign Up
          </button>
          <button
            className="cursor-pointer bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={logIn}
          >
            Log In
          </button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
