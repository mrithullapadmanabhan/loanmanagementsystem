export interface employeeObjectType {
  name: string;
  department: string;
  designation: string;
  gender: string;
  dob: string;
  doj: string;
  user: string;
}

export interface employeeType extends employeeObjectType {
  id: string;
}
