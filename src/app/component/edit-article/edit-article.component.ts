import { Component } from '@angular/core';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Observable } from 'rxjs';
import { Ressource } from '../../model/ressource.model';

@Component({
  selector: 'app-edit-article',
  standalone: false,

  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent {
  articles$!: Observable<Ressource[]>;
  constructor(private ressourceService: RessourceService) {}

  ngOnInit() {
    this.articles$ = this.ressourceService.getAllArticles();
    this.articles$.subscribe((articles) => {
      console.log('Liste des articles :', articles);
    });
  }
}
