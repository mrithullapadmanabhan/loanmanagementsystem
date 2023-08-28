import {
  faChair,
  faCubes,
  faMoneyBillWave,
  faRightFromBracket,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const employeeOptions = [
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/loan/create" },
  { label: "View Loans", Icon: faMoneyBillWave, route: "/loan" },
  { label: "View Items Purchased", Icon: faChair, route: "/item" },
  { label: "Logout", Icon: faRightFromBracket, route: "/login" },
];

export const adminOptions = [
  { label: "View Categories", Icon: faSitemap, route: "/admin/category" },
  { label: "View Makes", Icon: faCubes, route: "/admin/make" },
  { label: "View Loan cards", Icon: faMoneyBillWave, route: "/admin/loanCard" },
  { label: "View Item cards", Icon: faChair, route: "/admin/itemCard" },
  { label: "View Employees", Icon: faUser, route: "/admin/employee" },
  { label: "View Loans", Icon: faMoneyBillWave, route: "/admin/loan" },
  { label: "Logout", Icon: faRightFromBracket, route: "/login" },
];
