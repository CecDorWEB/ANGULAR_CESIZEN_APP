import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Ressource } from '../../model/ressource.model';
import { ActivatedRoute } from '@angular/router';

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
    if (type === 'articles') {
      this.ressources$ = this.ressourceService.getAllArticles();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des articles :', ressource);
      });
    } else if (type === 'tests') {
      this.ressources$ = this.ressourceService.getAllTest();
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des tests :', ressource);
      });
    }
  }
}
