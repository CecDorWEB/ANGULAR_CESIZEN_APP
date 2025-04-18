import { Component, ViewChild } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Question } from '../../model/question.model';
import { DisplayQuestionComponent } from '../../component/display-question/display-question.component';

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

  //Initialisation du compteur de score à 0
  @ViewChild(DisplayQuestionComponent) questionComponent!: DisplayQuestionComponent;
  score: number = 0;
  totalScore: number = 0;

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
      const questionScore = this.questionComponent.calculateScore();
      this.totalScore += questionScore;

      if (this.currentQuestionIndex < this.questionList.length - 1) {
        console.log("score finale :" + this.totalScore);
        this.currentQuestionIndex++;
        this.score = 0;
        this.questionComponent.resetAnswers();
      } else {
        console.log("score finale :" + this.totalScore);
        this.questionComponent.resetAnswers();
        this.currentStep = 'result';
      }

    }

    replay() {
      //this.currentStep = 'intro';
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      } else {
        this.currentStep = 'intro';
      }
    }
  
}
