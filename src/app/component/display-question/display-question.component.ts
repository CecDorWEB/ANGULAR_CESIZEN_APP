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
  selectedAnswers: string[] = [];

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
}
