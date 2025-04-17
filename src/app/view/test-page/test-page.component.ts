import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-test-page',
  standalone: false,
  
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
  ressourceId!: number;
  ressource!: Ressource;  

   constructor(
      private route: ActivatedRoute,
      private ressourceService: RessourceService
    ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
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
  
}
