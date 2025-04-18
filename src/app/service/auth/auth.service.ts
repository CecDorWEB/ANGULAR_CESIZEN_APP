import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'userData';
  private userSubject: BehaviorSubject<any>;

  constructor() {
    // Initialise l'état utilisateur à partir du LocalStorage
    const savedUser = localStorage.getItem(this.storageKey);
    this.userSubject = new BehaviorSubject<any>(
      savedUser ? JSON.parse(savedUser) : null
    );
  }

  login(userData: any): void {
    console.log('Connexion réussie:', userData);
    this.userSubject.next(userData); // Met à jour l'état global
    localStorage.setItem(this.storageKey, JSON.stringify(userData)); // Sauvegarde dans localStorage
  }

  logout(): void {
    console.log('Déconnexion en cours...');
    this.userSubject.next(null); // Réinitialise l'état global
    localStorage.removeItem(this.storageKey); // Supprime les données stockées
  }

  /** ✅ Getter simplifié pour récupérer l'utilisateur en tant qu'Observable */
  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getUser(): any {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
