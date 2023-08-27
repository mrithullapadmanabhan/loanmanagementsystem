import { Link } from "react-router-dom";


const NotFound = () => {
  return <div className="flex justify-center h-screen">
    <div className="px-5 py-8 md:px-0 md:w-[25%] mt-12">
      <div className="space-y-2">
        <p className="text-center">
          <h2 className="text-xl md:text-3xl font-bold text-center">404 Not Found</h2>
          Sorry, This page does not exist.
          <Link
            to="/login"
            className={`text-indigo-700 font-semibold text-sm`}
          >
            Go Back
          </Link>
        </p>
      </div>
    </div>
  </div>;
};

export default NotFound;
