import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ressource } from '../../model/ressource.model';

@Component({
  selector: 'app-display-test-header',
  standalone: false,
  
  templateUrl: './display-test-header.component.html',
  styleUrl: './display-test-header.component.scss'
})
export class DisplayTestHeaderComponent {
  @Input() ressource!: Ressource;

// transmission du changement de composant au parent view:test-page
  @Output() start = new EventEmitter<void>();

  onStart() {
    console.log("J'ai cliqué sur le bouton démarré")
    this.start.emit();
  }

}
