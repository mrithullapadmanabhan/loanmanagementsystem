import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAdmin, logout } from "service/auth";
import adminOptions, { employeeOptions } from "./sidebarOptions";

const Sidebar = () => {
  const navigate = useNavigate();
  const admin = isAdmin();
  const options = admin ? adminOptions : employeeOptions;

  return (
    <div>
      <div className="hidden sm:block sm:pl-5 h-full w-full  z-10 sm:w-[240px] py-10 bg-gray-100 font-poppins flex flex-col items-center gap-16  fixed top-0 left-0 transition-transform translate-x-0 ease-in-out">
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
                  if (label == "Logout") {
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
      </div>
    </div>
  );
};

export default Sidebar;
