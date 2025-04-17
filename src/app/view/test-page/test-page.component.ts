import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Question } from '../../model/question.model';

@Component({
  selector: 'app-test-page',
  standalone: false,
  
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
  ressourceId!: number;
  ressource!: Ressource;  

  questionList: Question[] = [];

  currentStep = 'intro';
  currentQuestionIndex = 0;

  constructor(
      private route: ActivatedRoute,
      private ressourceService: RessourceService
  ){}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.ressourceId = Number(params.get('id'));
  
        this.loadRessources();
        this.loadQuestionList();
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

    startTest() {
      this.currentStep = 'question';
      this.currentQuestionIndex = 0;
    }

    nextQuestion() {
      if (this.currentQuestionIndex < this.questionList.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.currentStep = 'result';
      }
    }

    beforeQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      } else {
        this.currentStep = 'intro';
      }
    }
  
}
