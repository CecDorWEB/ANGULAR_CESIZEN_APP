import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  newUser: User = {
    type: 'MEMBER',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role_id: 1,
  };

  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.errorMessage = null;
    if (
      !this.newUser.firstname ||
      !this.newUser.lastname ||
      !this.newUser.email ||
      !this.newUser.password
    ) {
      this.errorMessage = 'Tous les champs sont requis !';
      return;
    }

    this.userService.addUser(this.newUser).subscribe({
      next: (response) => {
        console.log('Formulaire inscription envoyé !', response);
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de l’utilisateur', error);
      },
      complete: () => {
        console.log('Requête terminée');
      },
    });
  }
}
