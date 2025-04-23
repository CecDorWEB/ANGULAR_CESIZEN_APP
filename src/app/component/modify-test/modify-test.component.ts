import { Component, Input, ViewChild } from '@angular/core';
import { Question } from '../../model/question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Answer } from '../../model/answer.model';
import { AnswerCreateDTO } from '../../model/answerCreateDTO.model';
import { ScoringText } from '../../model/scoringText.model';
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

  scoringText: ScoringText[] = [];

  AddQuestion: boolean = false;
  AddResponse: boolean = false;
  AddResult: boolean = false;
  isEditing: boolean = false;
  selectedQuestionId: number | null = null;

  newQuestion: Question = {
    id: 0,
    question: '',
    rule: '',
    number_expected_answers: null,
    listOfAnswers: [],
  };

  newAnswer: Partial<Answer> = {
    title: '',
    point: 0,
    multiplied: false,
  };

  newResult: Partial<ScoringText> = {
    minScore:0,
    maxScore:0,
    title: '',
    content: ''
  };

  errorMessage: string | null = null;

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {

      this.loadResult();
  }

  loadResult(): void {
      this.ressourceService.getScoringTextByRessourceId(this.ressourceId).subscribe(
        (results) => {
          this.scoringText = results.map(result => ({
            ...result,
            isEditing: false
          }));
          console.log("Liste des résultats du test:", results)
        },
        (error) => {
          console.error('Erreur lors de la récupération des résultats.', error);
        }
      );
    }

    // Méthode pour activer l'édition d'une ligne
    enableEditing(line: any): void {
      line.isEditing = !line.isEditing;
    }

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

  showAddResult(resultId: number) {
    this.AddResult = !this.AddResult;

    if (resultId === 0){
       this.newResult = {
      minScore: 0,
      maxScore: 0,
      title: '',
      content: ''
    };
    }
    else{
      const resultToEdit = this.scoringText.find(item => item.id === resultId);
      if (resultToEdit) {
        this.newResult = { ...resultToEdit }; // Copie des valeurs
      }
    }
  }

  cancelEditResult(): void {
    this.AddResult = false;
    this.newResult = {
      minScore: 0,
      maxScore: 0,
      title: '',
      content: ''
    };
  }

  showAddQuestion() {
    this.AddQuestion = !this.AddQuestion;
  }

  showAddAnswer(questionId: number): void {
    this.selectedQuestionId = questionId;
    this.AddResponse = !this.AddResponse;
  }

  onSubmitResult() {
    this.errorMessage = null;

    console.log("Données envoyées :", this.newResult);

    this.ressourceService
      .addResult(this.ressourceId, this.newResult)
      .subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Ajout ou modification du résultat réussie !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });

  }

  onSubmitNewQuestion() {
    this.errorMessage = null;

    if (!this.newQuestion.question || !this.newQuestion.question.trim()) {
      this.errorMessage = 'Veuillez ajouter le texte de la question !';
      return;
    }

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

  onSubmitNewAnswer(questionId: number) {
    if (!this.newAnswer.title) {
      this.errorMessage = 'Veuillez ajouter le texte de la réponse !';
      return;
    }

    this.ressourceService.addAnswer(questionId, this.newAnswer).subscribe({
      next: (response) => {
        console.log('Formulaire envoyé !', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de la réponse', error);
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

  deleteResult(resultId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce résultat?')) {
      this.ressourceService.deleteResult(resultId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Résultat supprimé avec succès !');
          this.loadResult();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
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

  deleteAnswer(event: Event, answerId: number) {
    event.preventDefault(); // évite le submit
    event.stopPropagation(); // évite les effets collatéraux

    if (confirm('Voulez-vous vraiment supprimer cette réponse?')) {
      this.ressourceService.deleteAnswer(answerId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Réponse supprimée avec succès!');
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
