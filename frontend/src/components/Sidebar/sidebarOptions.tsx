import {
  faChair,
  faCubes,
  faMoneyBillWave,
  faRightFromBracket,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const employeeOptions = [
  { label: "View Loans", Icon: faMoneyBillWave, route: "/loans" },
  { label: "View Items Purchased", Icon: faChair, route: "/employee/items" },
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/loan/apply" },
  { label: "Logout", Icon: faRightFromBracket, route: "login" },
];

export const adminOptions = [
  {
    label: "View Loan cards",
    Icon: faMoneyBillWave,
    route: "/admin/loan-card/all",
  },
  { label: "View Employees", Icon: faUser, route: "admin/employee/all" },
  { label: "View Items", Icon: faChair, route: "admin/item/all" },
  { label: "View Makes", Icon: faCubes, route: "admin/make/all" },
  { label: "View Categories", Icon: faSitemap, route: "admin/category/all" },
  { label: "Logout", Icon: faRightFromBracket, route: "login" },
];
