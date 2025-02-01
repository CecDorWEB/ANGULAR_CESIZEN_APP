import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user$: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$; // Observable directement utilisable dans le HTML
  }

  logout(): void {
    console.log('Déconnexion en cours...');
    this.authService.logout(); // Appelle la méthode de déconnexion du service d'authentification
    this.router.navigate(['/home']); // Redirige vers la page d'accueil
  }
}
