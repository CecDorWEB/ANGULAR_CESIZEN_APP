import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser(); // Récupérer l'utilisateur connecté

    if (user) {
      if (user.role === 2) {
        // Si l'utilisateur est admin
        this.router.navigate(['/admin']); // Rediriger vers la page admin
      } else {
        this.router.navigate(['/home']); // Rediriger vers la page utilisateur
      }
      return false; // Empêche la navigation initiale si redirection
    }

    return true; // Si non connecté, on permet l'accès (par exemple à la page login)
  }
}
