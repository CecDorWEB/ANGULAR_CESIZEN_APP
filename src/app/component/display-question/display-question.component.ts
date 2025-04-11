import { Component, Input } from '@angular/core';
import { Question } from '../../model/question.model';
import { Answer } from '../../model/answer.model';

@Component({
  selector: 'app-display-question',
  standalone: false,

  templateUrl: './display-question.component.html',
  styleUrl: './display-question.component.scss',
})
export class DisplayQuestionComponent {
  @Input() question!: Question; // Récupère les données du parent

  sortedAnswers!: Answer[];

  ngOnInit(): void {
    console.log('Question reçue dans OnInit:', this.question);
  }
}
