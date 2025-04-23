export interface ScoringText {
    id: number;
    minScore:number;
    maxScore:number;
    title: string;
    content: string;
    isEditing?: boolean; //pour afficher le formulaire d'édition
  }