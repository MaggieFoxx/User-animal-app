import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Link to="/users" className="w-1/2">
        <button className="w-full py-4 bg-indigo-600 text-white text-2xl rounded">
          Go to Users
        </button>
      </Link>
      <Link to="/animals" className="w-1/2">
        <button className="w-full py-4 bg-green-600 text-white text-2xl rounded">
          Go to Animals
        </button>
      </Link>
    </div>
  );
};
export default HomePage;
