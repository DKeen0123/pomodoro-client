import React from 'react';
import Axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../ui/ErrorNotice';

const Login = () => {
  const [email, setEmail] = React.useState<undefined | string>();
  const [password, setPassword] = React.useState<undefined | string>();
  const [error, setError] = React.useState<null | string>(null);

  const { setUserData } = React.useContext(UserContext);
  const history = useHistory();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const logInRes = await Axios.post(
        'http://localhost:5000/users/login',
        user
      );
      if (setUserData) {
        setUserData({
          token: logInRes.data.token,
          user: logInRes.data.user,
        });
        localStorage.setItem('auth-token', logInRes.data.token);
        history.push('/');
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(null)} />
      )}
      <div className="w-full max-w-md bg-gray-800">
        <form
          onSubmit={submit}
          action=""
          className=" bg-white shadow-md rounded px-8 py-8 pt-8"
        >
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold  pb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Johnbull@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log In"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
