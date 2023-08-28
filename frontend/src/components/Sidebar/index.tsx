import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { isAdmin } from "service/auth";
import { adminOptions, employeeOptions } from "./sidebarOptions";

const Sidebar = () => {
  const navigate = useNavigate();
  const admin = isAdmin();
  const options = admin ? adminOptions : employeeOptions;

  return (
    <div className="fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-5 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-20">
              <div className="text-lg tracking-wide text-grey-100">Welcome {admin ? " Admin" : " Employee"}</div>
            </div>
          </li>
          {options.map(({ label, route, Icon }) => {
            return (<li>
              <div onClick={() => navigate(route)} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-100 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={Icon} />
                </span>
                <span className="ml-4 text-sm tracking-wide truncate">{label}</span>
              </div>
            </li>);
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


{/* <div className="hidden sm:block sm:pl-5 h-full w-full  z-10 sm:w-[240px] py-10 bg-gray-100 font-poppins flex flex-col items-center gap-16  fixed top-0 left-0 transition-transform translate-x-0 ease-in-out">
        <h1 className="font-bold text-lg  whitespace-pre pb-10">
          Welcome {admin ? " Admin" : " Employee"}
        </h1>
        <div className="flex flex-col justify-start gap-10">
          {options.map(({ label, route, Icon }, index) => {
            return (
              <div
                key={index}
                className={`flex justify-start items-center cursor-pointer space-x-4 hover:text-todayQ-green`}
                onClick={() => {
                  if (label === "Logout") {
                    logout();
                  }
                  navigate(route);
                }}
              >
                <FontAwesomeIcon icon={Icon} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            );
          })}
        </div>
      </div> */}