export interface employeeObjectType {
  name: string;
  department: string;
  designation: string;
  gender: string;
  dob: string;
  doj: string;
  email: string;
}

export interface employeeType extends employeeObjectType {
  id: string;
}
