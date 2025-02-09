import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  newUser: User = {
    type: 'MEMBER',
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role_id: 1,
  };

  errorMessage: string | null = null;

  user$: Observable<any>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$; // Observable directement utilisable dans le HTML
  }

  onTypeChange() {
    this.newUser.role_id = this.newUser.type === 'MEMBER' ? 1 : 2;
  }

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
