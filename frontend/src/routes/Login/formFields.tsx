export const loginFormFields = {
  email: {
    type: "text" as const,
    label: "Email",
    placeholder: "test@test.com",
    errorMessage: "Invalid Email",
    regex:
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
    initialData: "",
    disabled: false,
  },
  password: {
    type: "password" as const,
    label: "Password",
    placeholder: "********",
    errorMessage:
      "Invalid Password. Must contain atleast 1 Uppercase character, 1 Lowercase character, 1 number, 1 symbol and have minimum length of 8",
    regex:
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$",
    initialData: "",
    disabled: false,
  },
};
