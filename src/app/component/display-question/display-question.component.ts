import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() score!: number; // Récupère les données du parent
  @Output() scoreChange = new EventEmitter<number>();

  sortedAnswers!: Answer[];
  selectedAnswers: string[] = [];

  selectedPoints: number[] = [];

  ngOnInit(): void {
    console.log('Question reçue dans OnInit:', this.question);
  }

  onCheckboxChange(
    event: Event,
    answer: string,
    number_expected_answers: number
  ) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (this.selectedAnswers.length < number_expected_answers) {
        this.selectedAnswers.push(answer);
      } else {
        checkbox.checked = false;
      }
    } else {
      this.selectedAnswers = this.selectedAnswers.filter((a) => a !== answer);
    }
  }

  onAnswerChange(event: Event, point: number) {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.checked) {
      this.selectedPoints.push(point);
    } else {
      const index = this.selectedPoints.indexOf(point);
      if (index > -1) {
        this.selectedPoints.splice(index, 1);
      }
    }
  }

  calculateScore(): number {
    return this.selectedPoints.reduce((acc, val) => acc + val, 0);
  }

  resetAnswers() {
    this.selectedPoints = [];
  }
}
