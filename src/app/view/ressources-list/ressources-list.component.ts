import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  searchInput$ = new BehaviorSubject<string>('');
  filteredRessources$!: Observable<Ressource[]>;

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      console.log('Type sélectionné :', this.type);
      this.loadData();

      // Filtrage en fonction de la recherche
      this.filteredRessources$ = combineLatest([
        this.ressources$,
        this.searchInput$,
      ]).pipe(
        map(([ressources, searchInput]) =>
          ressources.filter((ressource) =>
            this.matchesSearch(ressource, searchInput)
          )
        )
      );
    });
  }

  loadData() {
    if (this.type === 'articles') {
      this.ressources$ = this.ressourceService.getAllRessourcesAllowedByType(1);
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des articles :', ressource);
      });
    } else if (this.type === 'tests') {
      this.ressources$ = this.ressourceService.getAllRessourcesAllowedByType(2);
      this.ressources$.subscribe((ressource) => {
        console.log('Liste des tests :', ressource);
      });
    } else {
      console.log('Type inconnu');
    }
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.searchInput$.next(value);
  }

  private matchesSearch(ressource: Ressource, searchInput: string): boolean {
    if (!searchInput) return true;
    return (
      ressource.title.toLowerCase().includes(searchInput) ||
      ressource.headerIntroduction.toLowerCase().includes(searchInput)
    );
  }
}
