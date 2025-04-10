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

  retour() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
