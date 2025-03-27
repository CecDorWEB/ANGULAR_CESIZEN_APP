import { Component, Input } from '@angular/core';
import { Ressource } from '../../model/ressource.model';

@Component({
  selector: 'app-ressource-card',
  standalone: false,

  templateUrl: './ressource-card.component.html',
  styleUrl: './ressource-card.component.scss',
})
export class RessourceCardComponent {
  @Input() ressource!: Ressource; // Récupère les données du parent
}
