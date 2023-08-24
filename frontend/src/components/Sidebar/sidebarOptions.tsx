import {
  faChair,
  faCubes,
  faMoneyBillWave,
  faRightFromBracket,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const employeeOptions = [
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/employee/loan/create" },
  { label: "View Loans", Icon: faMoneyBillWave, route: "/employee/loanCard" },
  { label: "View Items Purchased", Icon: faChair, route: "/employee/itemCard" },
  { label: "Logout", Icon: faRightFromBracket, route: "/login" },
];

export const adminOptions = [
  {
    label: "View Loan cards",
    Icon: faMoneyBillWave,
    route: "/admin/loanCard",
  },
  { label: "View Employees", Icon: faUser, route: "/admin/employee" },
  { label: "View Item cards", Icon: faChair, route: "/admin/itemCard" },
  { label: "View Makes", Icon: faCubes, route: "/admin/make" },
  { label: "View Categories", Icon: faSitemap, route: "/admin/category" },
  { label: "Logout", Icon: faRightFromBracket, route: "/login" },
];
