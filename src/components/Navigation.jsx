// Navigation.jsx
import React from 'react';
import { Link } from 'react-scroll';

const Navigation = ({ showNav }) => {
  return (
    <nav
      className={`fixed top-0 right-0 m-4 transition-all duration-300 ease-in-out ${
        showNav ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ul className="flex space-x-6 text-xl font-poppins">
        {['About Me', 'Experiences', 'Contact Me'].map((item) => (
          <li key={item}>
            <Link
              to={item.replace(' ', '').toLowerCase()}
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
