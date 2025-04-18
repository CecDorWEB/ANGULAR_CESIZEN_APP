import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-user-management',
  standalone: false,

  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  users$!: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
    this.users$.subscribe((users) => {
      console.log('Liste des utilisateurs :', users);
    });
  }

  showRegister = false;
  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  deleteUser(userId: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Utilisateur supprimé avec succès !');
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }

  changeUserStatut(userId: number, userStatut: boolean) {
    const confirmationMessage = userStatut
      ? 'Voulez-vous vraiment suspendre cet utilisateur ?'
      : 'Voulez-vous autoriser cet utilisateur ?';

    if (confirm(confirmationMessage)) {
      this.userService.autorizationUser(userId).subscribe({
        next: (response) => {
          console.log(response); // Affiche la réponse du backend
          alert('Changement de statut réalisé avec succès !');
          this.ngOnInit(); // Recharge la liste après mise à jour
        },
        error: (error) => {
          console.error("Erreur lors du changement d'autorisation :", error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }
}
