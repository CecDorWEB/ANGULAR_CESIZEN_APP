export interface Answer {
  id: number;
  title: string;
  point: number;
  multiplied: boolean;
  isEditing?: boolean; //pour afficher le formulaire d'édition
}
