import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$; // Observable directement utilisable dans le HTML
  }
}
