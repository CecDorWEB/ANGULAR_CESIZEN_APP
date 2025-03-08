import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { Observable, take } from 'rxjs';
import { RessourceService } from '../../service/ressource/ressource.service';
import { AuthService } from '../../service/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-ressource',
  standalone: false,

  templateUrl: './create-ressource.component.html',
  styleUrl: './create-ressource.component.scss',
})
export class CreateRessourceComponent {
  newRessource: Ressource = {
    id: 0,
    title: '',
    headerImage: '',
    headerIntroduction: '',
    type_id: 0,
    user_id: 0,
  };

  errorMessage: string | null = null;

  user$: Observable<any>;

  type: string = '';

  constructor(
    private ressourceService: RessourceService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.user$ = this.authService.user$; // Observable directement utilisable dans le HTML
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (!this.newRessource.title || !this.newRessource.headerIntroduction) {
      this.errorMessage = 'Tous les champs sont requis !';
      return;
    }

    this.newRessource.type_id = this.type === 'article' ? 1 : 2;

    // Souscription à l'Observable pour récupérer user_id
    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.errorMessage = 'Utilisateur non trouvé.';
        return;
      }
      this.newRessource.user_id = user.id;

      this.ressourceService.addRessource(this.newRessource).subscribe({
        next: (response) => {
          console.log('Formulaire envoyé !', response);
          alert('Ajout ressource réussie !');
          window.location.reload();
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout de la ressource', error);
        },
        complete: () => {
          console.log('Requête terminée');
        },
      });
    });
  }
}
