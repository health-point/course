export interface Quiz {
questions: any;
  id: number;
  name: string;
  description: string;
  items: any[]; 
}
export interface Question {
    text : string; 
    answer: string[]; 
    options: string[];
}