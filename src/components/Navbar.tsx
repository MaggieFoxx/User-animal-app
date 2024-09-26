import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between px-4 md:px-16 py-4 bg-gray-200">
      <div className="md:text-2xl font-semibold tracking-tight">
        InQool test app
      </div>
      <ul className="flex text-base md:ml-auto md:text-2xl font-semibold tracking-tight">
        <li>
          <Link to="/" className="mr-6 flex-shrink-0">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/users" className="mr-6 flex-shrink-0">
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/animals" className="mr-6 flex-shrink-0">
            <span>Animals</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
