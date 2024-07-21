import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary p-4 text-white shadow-md flex justify-between items-center w-full">
      <nav className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">My App</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/register" className="hover:text-primary-dark">Register</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-primary-dark">Login</Link>
          </li>
          <li>
            <Link to="/members" className="hover:text-primary-dark">Members</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
