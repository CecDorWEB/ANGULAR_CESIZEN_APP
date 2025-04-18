import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-display-test-result',
  standalone: false,
  
  templateUrl: './display-test-result.component.html',
  styleUrl: './display-test-result.component.scss'
})
export class DisplayTestResultComponent {
 @Input() totalScore!: number; 
}
