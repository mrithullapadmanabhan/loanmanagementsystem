export interface loanCardObjectType {
  name: string;
  category: string;
  duration: string;
}

export interface loanCardType extends loanCardObjectType {
  id: string;
}
