import { Component, Input, input } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { ScoringText } from '../../model/scoringText.model';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../model/user.model';
import { UserResult } from '../../model/userResult.model';

@Component({
  selector: 'app-display-test-result',
  standalone: false,
  
  templateUrl: './display-test-result.component.html',
  styleUrl: './display-test-result.component.scss'
})
export class DisplayTestResultComponent {
 @Input() totalScore!: number; 
 @Input() ressource!: Ressource; 

 private user: User | null = null;

  scoringText!: ScoringText;

  newUserResult: Partial<UserResult> = {
    };

    errorMessage: string | null = null;
  
   constructor(
        private ressourceService: RessourceService, private authService: AuthService
    ){
    }

 ngOnInit(): void {
  if(this.ressource.id && this.totalScore ){
    this.loadResultTestText();

    this.user = this.authService.getUser();
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

  saveResult(){
    if(this.user && this.user.type === "member"){
      console.log("Utilisateur de type Membre connecté");
      console.log("ici l'id de la ressource:", this.ressource.id);

      this.newUserResult = {
        score: this.totalScore,
        textResult: this.scoringText.title + ' ' + this.scoringText.content,
        user: { id: this.user.id },
        test: { id: this.ressource.id }
      };

      this.saveNewResult();
    } else {
      if(this.user && this.user?.type != "member"){
        alert("Désolé, seuls nos membres peuvent sauvegarder leurs résultats.")
      } else {
        alert("Veuillez vous connecter pour sauvegarder vos résultats.")
      }
    }
    
  }

  saveNewResult() {
    this.errorMessage = null;

    this.ressourceService
      .addUserResult(this.newUserResult)
      .subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Sauvegarde du résultat réussie !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });
  }
}


