import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

const Header = () => (
  <nav className="bg-gray-800 p-2 mt-0 w-full z-10 top-0">
    <div className="container mx-auto flex flex-wrap items-center">
      <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
        <Link
          className="text-white no-underline hover:text-white hover:no-underline"
          to="/"
        >
          <span className="text-2xl pl-2">Pomoduro</span>
        </Link>
      </div>
      <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
        <AuthOptions />
      </div>
    </div>
  </nav>
);

export default Header;
