import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$; // Observable directement utilisable dans le HTML
  }
}
