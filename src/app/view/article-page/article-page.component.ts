import { Component } from '@angular/core';
import { Paragraph } from '../../model/paragraph.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';
import { Ressource } from '../../model/ressource.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-page',
  standalone: false,

  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  ressourceId!: number;
  ressource!: Ressource;
  paragraphList$!: Observable<Paragraph[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.ressourceId = Number(params.get('id'));

      this.loadRessources();
      this.loadParagraphList();
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

  loadParagraphList(): void {
    this.paragraphList$ = this.ressourceService.getParagraphListbyArticleId(
      this.ressourceId
    );
    this.paragraphList$.subscribe(
      (paragraphs) => {
        console.log('Type de la réponse:', typeof paragraphs);
        console.log('Liste des paragraphes:', paragraphs);
      },
      (error) => {
        console.error('Erreur lors du chargement des paragraphes:', error);
      }
    );
  }
}
