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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.userService.getUser(this.LogInfos).subscribe({
      next: (response) => {
        console.log('Réponse du back:', response);

        // Enregistrer les données utilisateur dans le service
        this.authService.setUser(JSON.parse(response));

        // Rediriger vers une autre page (par exemple, le tableau de bord)
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erreur :', error.error);
      },
      complete: () => {
        console.log('Requête terminée');
      },
    });
    console.log('Formulaire connexion envoyé !');
    console.log(this.LogInfos);
  }
}
