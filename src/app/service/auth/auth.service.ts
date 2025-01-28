import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any = null;
  private userSubject: BehaviorSubject<any>;
  private storageKey = 'userData';

  constructor() {
    // Initialise l'état utilisateur à partir du LocalStorage
    const userData = localStorage.getItem(this.storageKey);
    this.userSubject = new BehaviorSubject<any>(
      userData ? JSON.parse(userData) : null
    );
  }

  setUser(data: any): void {
    this.userSubject.next(data); // Met à jour le BehaviorSubject
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getUser(): any {
    return this.userSubject.value;
  }

  getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.userData; // Retourne true si les données utilisateur existent
  }

  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem(this.storageKey);
  }
}
