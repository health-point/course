export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions?: any;
  items: any[];
}


export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface Question {
    text : string; 
    answer: string[]; 
    options: string[];
}