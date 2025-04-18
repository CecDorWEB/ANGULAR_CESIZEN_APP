import { Answer } from './answer.model';

export interface Question {
  id: number;
  question: string;
  rule: string;
  number_expected_answers: number | null;
  isEditing?: boolean; //pour afficher le formulaire d'édition
  listOfAnswers: Answer[] | null;
}
