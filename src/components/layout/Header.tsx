import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

const Header = () => (
  <div>
    <Link to="/">
      <h1>Pomoduro</h1>
    </Link>
    <AuthOptions />
  </div>
);

export default Header;
