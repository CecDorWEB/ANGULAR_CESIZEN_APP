import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any = null;
  private subscription: Subscription = new Subscription(); // Pour gérer l'abonnement

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // S'abonner aux changements d'utilisateur
    this.subscription = this.authService
      .getUserObservable()
      .subscribe((data) => {
        console.log('Utilisateur connecté :', data);
        this.user = data; // Met à jour l'utilisateur quand il change
      });
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
