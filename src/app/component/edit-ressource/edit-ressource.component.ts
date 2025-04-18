import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Ressource } from '../../model/ressource.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ressource',
  standalone: false,

  templateUrl: './edit-ressource.component.html',
  styleUrl: './edit-ressource.component.scss',
})
export class EditRessourceComponent {
  ressources$!: Observable<Ressource[]>;
  type: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  showRegister = false;
  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      const type = params.get('type');
      if (type) {
        this.loadRessources(type);
      }
    });
  }

  loadRessources(type: string) {
    if (type === 'article') {
      this.ressources$ = this.ressourceService.getAllArticles();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des articles :', ressource);
      });
    } else if (type === 'test') {
      this.ressources$ = this.ressourceService.getAllTest();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des tests :', ressource);
      });
    }
  }

  deleteRessource(ressourceId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
      this.ressourceService.deleteRessource(ressourceId).subscribe({
        next: (response) => {
          console.log(response);
          alert('Ressource supprimée avec succès !');
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur : ' + error.error);
        },
      });
    }
  }

  changeRessourceStatut(ressourceId: number, ressourceStatut: boolean) {
    const confirmationMessage = ressourceStatut
      ? 'Voulez-vous vraiment suspendre cette ressource ?'
      : 'Voulez-vous autoriser cette ressource ?';

    if (confirm(confirmationMessage)) {
      this.ressourceService.autorizationRessource(ressourceId).subscribe({
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

  modifier() {
    this.router.navigate(['modify'], { relativeTo: this.route });
  }
}
