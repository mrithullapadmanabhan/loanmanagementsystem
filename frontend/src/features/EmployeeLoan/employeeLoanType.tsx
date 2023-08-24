export interface employeeLoanObjectType {
  status: string;
  issueDate: string;
  employee: string;
  loan: string;
  item: string;
}

export interface employeeLoanType extends employeeLoanObjectType {
  id: string;
}
