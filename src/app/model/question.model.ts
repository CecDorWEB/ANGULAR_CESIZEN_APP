export interface Question {
  id: number;
  question: string;
  rule: string;
  number_expected_answers: number | null;
}
