import { Component, Input } from '@angular/core';
import { Ressource } from '../../model/ressource.model';

@Component({
  selector: 'app-display-test-header',
  standalone: false,
  
  templateUrl: './display-test-header.component.html',
  styleUrl: './display-test-header.component.scss'
})
export class DisplayTestHeaderComponent {
  @Input() ressource!: Ressource;
}
