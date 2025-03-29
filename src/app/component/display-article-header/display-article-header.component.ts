import { Component, Input } from '@angular/core';
import { Ressource } from '../../model/ressource.model';
import { Paragraph } from '../../model/paragraph.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../../service/ressource/ressource.service';

@Component({
  selector: 'app-display-article-header',
  standalone: false,

  templateUrl: './display-article-header.component.html',
  styleUrl: './display-article-header.component.scss',
})
export class DisplayArticleHeaderComponent {
  @Input() ressource!: Ressource;
}
