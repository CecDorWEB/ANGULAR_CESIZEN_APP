import { Component } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-display-start-ressource',
  standalone: false,

  templateUrl: './display-start-ressource.component.html',
  styleUrl: './display-start-ressource.component.scss',
})
export class DisplayStartRessourceComponent {
  ressource$!: Observable<Ressource[]>;
  ressourceId: number = 0;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); //le get params renvoi obligatoirement un string
      if (id) {
        this.ressourceId = +id; //convertir le string en number
        this.loadRessources(this.ressourceId);
      }
    });
  }

  loadRessources(ressourceId: number) {
    this.ressource$ = this.ressourceService.getRessourceById(ressourceId);
    this.ressource$.subscribe((ressource) => {
      console.log('Info de la ressource :', ressource);
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveRessource() {
    console.log('Article modifié:', this.ressource$);
    this.isEditing = false;
  }
}
