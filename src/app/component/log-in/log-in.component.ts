import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  LogInfos: Partial<User> = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;

    this.userService.getUser(this.LogInfos).subscribe({
      next: (response) => {
        console.log('Réponse du back:', response);
        const user =
          typeof response === 'string' ? JSON.parse(response) : response;
        // Enregistrer les données utilisateur dans le service
        this.authService.login(user);

        // Rediriger vers une autre page (par exemple, le tableau de bord)
        if (user.role == 2) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Erreur :', error.error);
        if (error.status === 403) {
          this.errorMessage =
            "Compte suspendu. Veuillez contacter l'administrateur.";
        } else if (error.status === 401) {
          this.errorMessage = 'Identifiant ou mot de passe invalide.';
        } else {
          this.errorMessage =
            'Échec de la connexion. Vérifiez vos informations.';
        }
      },
      complete: () => {
        console.log('Requête terminée');
      },
    });
    console.log('Formulaire connexion envoyé !');
    console.log(this.LogInfos);
  }
}
