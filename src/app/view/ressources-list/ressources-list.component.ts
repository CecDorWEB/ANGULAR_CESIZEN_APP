import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ressource } from '../../model/ressource.model';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-ressources-list',
  standalone: false,

  templateUrl: './ressources-list.component.html',
  styleUrl: './ressources-list.component.scss',
})
export class RessourcesListComponent {
  type: string = '';
  ressources$!: Observable<Ressource[]>;

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      console.log('Type sélectionné :', this.type);
      this.loadData();
    });
  }

  loadData() {
    if (this.type === 'articles') {
      this.ressources$ = this.ressourceService.getAllArticles();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des articles :', ressource);
      });
    } else if (this.type === 'tests') {
      this.ressources$ = this.ressourceService.getAllTest();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des tests :', ressource);
      });
    } else {
      console.log('Type inconnu');
    }
  }
}
