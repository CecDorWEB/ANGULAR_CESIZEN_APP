import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { UserTestResultHistory } from '../../model/userTestResultHistory.model';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user$: Observable<any>;
  userTestResultList: UserTestResultHistory[]=[];

  constructor(private authService: AuthService,private ressourceService: RessourceService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {

    this.loadUserTestResultList();
  }

  loadUserTestResultList(): void {
    this.authService.user$.subscribe((user) => {
      if (user && user.id) {
        this.ressourceService.getUserTestResult(user.id).subscribe(
          (userTestResultHistory) => {
            this.userTestResultList = userTestResultHistory;
            console.log('Liste des résultats:', userTestResultHistory);
          },
          (error) => {
            console.error('Erreur lors de la récupération de la ressource', error);
          }
        );
      }
    });
  }

}
