export interface ScoringText {
    id: number;
    min_score:number;
    max_score:number;
    title: string;
    content: string;
    isEditing?: boolean; //pour afficher le formulaire d'édition
  }