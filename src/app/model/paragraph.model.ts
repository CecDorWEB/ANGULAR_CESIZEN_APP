export interface Paragraph {
  id: number;
  paragraphOrder: number;
  title: string;
  body: string;
  visualSupport: string;
  altVisualSupport: string;
  isEditing?: boolean; //pour afficher le formulaire d'édition
}
