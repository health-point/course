export interface Quiz{
    id?: number;
    name: string;
    description?: string;
    questions: Question[];
}
export interface Question {
    text : string; 
    answer: string[]; 
    options: string[];
}