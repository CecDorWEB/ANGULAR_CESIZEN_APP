import { Component, Input, input } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { ScoringText } from '../../model/scoringText.model';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-display-test-result',
  standalone: false,
  
  templateUrl: './display-test-result.component.html',
  styleUrl: './display-test-result.component.scss'
})
export class DisplayTestResultComponent {
 @Input() totalScore!: number; 
 @Input() ressource!: Ressource; 

  scoringText!: ScoringText;

   constructor(
        private ressourceService: RessourceService
    ){}

 ngOnInit(): void {
  if(this.ressource.id && this.totalScore ){
    this.loadResultTestText();
  }
  };

  loadResultTestText(): void {
    this.ressourceService.getResultTestText(this.ressource.id, this.totalScore).subscribe(
      (data: ScoringText) => {
        this.scoringText = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la ressource', error);
      }
    );
  }
}


