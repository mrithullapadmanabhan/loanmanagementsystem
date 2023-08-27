import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return <div className="flex justify-center h-screen">
    <div className="px-5 py-8 md:px-0 md:w-[25%] mt-12">
      <div className="space-y-2">
        <p className="text-center">
          <h2 className="text-xl md:text-5xl font-bold text-center">404 Not Found</h2>
          Sorry, This page does not exist. <br />
          <button className="bg-blue-900 dark:bg-gray-900 normal-button" onClick={goBack}>
            Go back.
          </button>
        </p>
      </div>
    </div>
  </div>;
};

export default NotFound;
