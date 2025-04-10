import { Component, Input } from '@angular/core';
import { Question } from '../../model/question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-modify-test',
  standalone: false,

  templateUrl: './modify-test.component.html',
  styleUrl: './modify-test.component.scss',
})
export class ModifyTestComponent {
  @Input() questionList!: Question[];
  @Input() question!: Question;
  @Input() type!: String;
  @Input() ressourceId!: number;

  AddQuestion: boolean = false;
  isEditing: boolean = false;

  newQuestion: Question = {
    id: 0,
    question: '',
    rule: '',
    number_expected_answers: null,
  };
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  actualizeQuestionList(): void {
    if (this.type == 'test') {
      this.loadQuestionList();
    }
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

  showAddQuestion() {
    this.AddQuestion = !this.AddQuestion;
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

  toggleQuestionEdit(question: any): void {
    this.questionList.forEach((q) => (q.isEditing = false)); // Réinitialise les autres
    question.isEditing = true;
  }

  // Méthode pour soumettre le formulaire
  updateQuestion() {
    if (!this.question.id) {
      console.error('Aucun ID de question fourni');
      return;
    }

    this.ressourceService.updateQuestion(this.question).subscribe({
      next: (updatedQuestion) => {
        console.log('Question mise à jour :', updatedQuestion);
        alert('Mise à jour réussie !');
        this.loadQuestionList();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la question :', err);
        alert('Échec de la mise à jour.');
      },
    });
  }

  setQuestionToEdit(selectedQuestion: any) {
    this.question = { ...selectedQuestion }; // Copie les données dans l'objet utilisé par le formulaire
  }

  deleteQuestion(questionId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette question?')) {
      this.ressourceService.deleteQuestion(questionId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Question supprimée avec succès !');
          this.actualizeQuestionList();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }
}
