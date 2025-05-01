import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { UserTestResultHistory } from '../../model/userTestResultHistory.model';
import { RessourceService } from '../../service/ressource/ressource.service';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user$: Observable<any>;
  userTestResultList: UserTestResultHistory[]=[];

  newPassword: Partial<User> = {
    id:0,
    password: '',
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService,private ressourceService: RessourceService,private userService: UserService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.loadUserTestResultList();
  }

  loadUserTestResultList(): void {
    this.authService.user$.subscribe((user) => {
      if (user && user.id) {
        this.ressourceService.getUserTestResult(user.id).subscribe(
          (userTestResultHistory) => {
            this.userTestResultList = userTestResultHistory;
            console.log('Liste des résultats:', userTestResultHistory);
          },
          (error) => {
            console.error('Erreur lors de la récupération de la ressource', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (!this.newPassword.password) {
      this.errorMessage = 'Tous les champs sont requis !';
      return;
    } 
    
    // Souscription à l'Observable pour récupérer user_id
      this.authService.user$.subscribe((user) => {
          if (!user) {
            this.errorMessage = 'Utilisateur non trouvé.';
            return;
          }
          this.newPassword.id = user.id;
      
      //Envoi des params vers le userService pour mettre à jour le mot de passe
      this.userService.updatePassword(this.newPassword).subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Modification du mot de passe réussi !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de la modification du mot de passe', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });
        
      }
    )
  }

}
