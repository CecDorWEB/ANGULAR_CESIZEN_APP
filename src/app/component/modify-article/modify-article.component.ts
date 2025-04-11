import { Component, Input } from '@angular/core';
import { Paragraph } from '../../model/paragraph.model';
import { RessourceService } from '../../service/ressource/ressource.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-article',
  standalone: false,

  templateUrl: './modify-article.component.html',
  styleUrl: './modify-article.component.scss',
})
export class ModifyArticleComponent {
  @Input() paragraphList!: Paragraph[];
  @Input() paragraph!: Paragraph;
  @Input() type!: String;
  @Input() ressourceId!: number;

  AddParagraph: boolean = false;
  isEditing: boolean = false;

  newParagraph: Paragraph = {
    id: 0,
    paragraphOrder: 0,
    title: '',
    body: '',
    visualSupport: '',
    altVisualSupport: '',
  };
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  actualizeParagraphList(): void {
    if (this.type == 'article') {
      this.loadParagraphList();
    }
  }

  loadParagraphList(): void {
    this.ressourceService
      .getParagraphListbyArticleId(this.ressourceId)
      .subscribe(
        (paragraphs) => {
          this.paragraphList = paragraphs;
          console.log('Liste des paragraphes:', paragraphs);
        },
        (error) => {
          console.error('Erreur lors du chargement des paragraphes:', error);
        }
      );
  }

  showAddParagraph() {
    this.AddParagraph = !this.AddParagraph;
  }

  onSubmitNewParagraph() {
    this.errorMessage = null;
    if (
      !this.newParagraph.paragraphOrder ||
      this.newParagraph.paragraphOrder === 0 ||
      !this.newParagraph.body
    ) {
      this.errorMessage =
        "Attention renseigner le numéro d'ordre d'affichage du paragraphe (différent de 0) et le contenu";
      return;
    }

    this.ressourceService
      .addParagraph(this.ressourceId, this.newParagraph)
      .subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Ajout ressource réussie !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout du paragraphe', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleParagraphEdit(paragraph: any): void {
    this.paragraphList.forEach((p) => (p.isEditing = false)); // Réinitialise les autres
    paragraph.isEditing = true;
  }

  // Méthode pour soumettre le formulaire
  updateParagraph() {
    if (!this.paragraph.id) {
      console.error('Aucun ID de paragraphe fourni');
      return;
    }

    this.ressourceService.updateParagraph(this.paragraph).subscribe({
      next: (updatedParagraph) => {
        console.log('Paragraphe mis à jour :', updatedParagraph);
        alert('Mise à jour réussie !');
        this.loadParagraphList();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du paragraphe :', err);
        alert('Échec de la mise à jour.');
      },
    });
  }

  setParagraphToEdit(selectedParagraph: any) {
    this.paragraph = { ...selectedParagraph }; // Copie les données dans l'objet utilisé par le formulaire
  }

  deleteParagraph(paragraphId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce paragraphe ?')) {
      this.ressourceService.deleteParagraph(paragraphId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Paragraphe supprimé avec succès !');
          this.actualizeParagraphList();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }
}
