import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Ressource } from '../../model/ressource.model';

@Component({
  selector: 'app-modify-ressource',
  standalone: false,

  templateUrl: './modify-ressource.component.html',
  styleUrl: './modify-ressource.component.scss',
})
export class ModifyRessourceComponent {
  type!: string;
  ressource!: Ressource;
  ressourceId!: number;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      this.ressourceId = Number(params.get('id'));

      this.loadRessources();
    });
  }

  loadRessources(): void {
    this.ressourceService.getRessourceById(this.ressourceId).subscribe(
      (data: Ressource) => {
        this.ressource = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la ressource', error);
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updateRessource(): void {
    if (!this.ressource || !this.ressource.id) {
      console.error('Impossible de modifier : ressource invalide.');
      return;
    }

    if (!this.type) {
      console.error('Impossible de modifier : type non défini.');
      return;
    }

    this.ressourceService.updateRessource(this.ressource, this.type).subscribe({
      next: (response) => {
        console.log('Mise à jour effectuée avec succès:', response);
        this.ressource = response;
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Erreur lors de la modification de la ressource:', error);
      },
    });
  }

  retour() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
