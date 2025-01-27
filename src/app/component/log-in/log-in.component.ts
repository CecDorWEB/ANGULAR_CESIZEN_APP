import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
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

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.getUser(this.LogInfos).subscribe({
      next: (response) => {
        console.log('Réponse du back:', response);
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
