import api from "./api";

export const isLoggedIn = () => {
  const access = localStorage.getItem("accessToken");
  return (
    access != null &&
    !window.location.href.includes("/login") &&
    !window.location.href.includes("/register")
  );
};

type loginData = {
  email: string;
  password: string;
};

export const apiLogin = async (data: loginData) => {
  try {
    localStorage.clear();

    const res = await api.post("/auth/login", data);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("employeeID", res.data.employeeID);

    const roles = res.data.userRoles
      .map((role: { name: string }) => role.name)
      .join();
    localStorage.setItem("roles", roles);

    return true;
  } catch {
    return false;
  }
};

export const employeeRegister = async (data: loginData) => {
  try {
    await api.post("/employee/register", data);
    return true;
  } catch {
    return false;
  }
};
