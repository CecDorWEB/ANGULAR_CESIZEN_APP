export interface UserResult {
    id: number;
    realizeDate:Date;
    score:number;
    textResult: string;
    user: { id: number }; 
    test: { id: number };
  }