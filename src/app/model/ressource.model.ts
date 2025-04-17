export interface Ressource {
  id: number;
  title: string;
  headerImage: string;
  altHeaderImage:string;
  headerIntroduction: string;
  type_id: number;
  user_id: number;
  statut?: boolean;
  publicationDate?: Date;
  updateDate?: Date;
}
