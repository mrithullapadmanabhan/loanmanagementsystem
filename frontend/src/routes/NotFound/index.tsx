import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl text-blue-900 lg:text-6xl mb-6">
              404
            </h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              Oops! Page not found!
            </h6>

            <p className="mb-4 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <div
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-md text-gray-100 bg-blue-900 hover:bg-blue-700"
            >
              Go back
            </div>
          </div>
        </div>
      </div>
    </>
  );
}