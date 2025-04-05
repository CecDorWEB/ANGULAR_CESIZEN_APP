import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Ressource } from '../../model/ressource.model';
import { Paragraph } from '../../model/paragraph.model';
import { Question } from '../../model/question.model';

@Component({
  selector: 'app-modify-ressource',
  standalone: false,

  templateUrl: './modify-ressource.component.html',
  styleUrl: './modify-ressource.component.scss',
})
export class ModifyRessourceComponent {
  type!: string;
  ressource!: Ressource;
  ressourceId!: number;
  isEditing: boolean = false;
  AddParagraphOrQuestion: boolean = false;

  newParagraph: Paragraph = {
    id: 0,
    paragraphOrder: 0,
    title: '',
    body: '',
    visualSupport: '',
    altVisualSupport: '',
  };
  paragraphList: Paragraph[] = [];
  paragraph: any = {};

  newQuestion: Question = {
    id: 0,
    question: '',
    rule: '',
    number_expected_answers: null,
  };
  questionList: Question[] = [];
  question: any = {};

  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      this.ressourceId = Number(params.get('id'));

      this.loadRessources();

      if (this.type == 'article') {
        this.loadParagraphList();
      } else if ((this.type = 'test')) {
        this.loadQuestionList();
      }
    });
  }

  loadRessources(): void {
    this.ressourceService.getRessourceById(this.ressourceId).subscribe(
      (data: Ressource) => {
        this.ressource = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la ressource', error);
      }
    );
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

  loadQuestionList(): void {
    this.ressourceService.getQuestionListbyTestId(this.ressourceId).subscribe(
      (questions) => {
        this.questionList = questions;
        console.log('Liste des questions:', questions);
      },
      (error) => {
        console.error('Erreur lors du chargement des paragraphes:', error);
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleParagraphEdit(paragraph: any): void {
    this.paragraphList.forEach((p) => (p.isEditing = false)); // Réinitialise les autres
    paragraph.isEditing = true;
  }

  updateRessource(): void {
    if (!this.ressource || !this.ressource.id) {
      console.error('Impossible de modifier : ressource invalide.');
      return;
    }

    if (!this.type) {
      console.error('Impossible de modifier : type non défini.');
      return;
    }

    this.ressourceService.updateRessource(this.ressource, this.type).subscribe({
      next: (response) => {
        console.log('Mise à jour effectuée avec succès:', response);
        this.ressource = response;
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Erreur lors de la modification de la ressource:', error);
      },
    });
  }

  setParagraphToEdit(selectedParagraph: any) {
    this.paragraph = { ...selectedParagraph }; // Copie les données dans l'objet utilisé par le formulaire
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

  showAddParagraphOrQuestion() {
    this.AddParagraphOrQuestion = !this.AddParagraphOrQuestion;
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

  deleteParagraph(paragraphId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce paragraphe ?')) {
      this.ressourceService.deleteParagraph(paragraphId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Paragraphe supprimé avec succès !');
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }

  onSubmitNewQuestion() {
    this.errorMessage = null;

    this.ressourceService
      .addQuestion(this.ressourceId, this.newQuestion)
      .subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Ajout de la question réussie !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout de la question', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });
  }

  retour() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
