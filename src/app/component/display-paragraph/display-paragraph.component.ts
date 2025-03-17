import { Component, Input } from '@angular/core';
import { Paragraph } from '../../model/paragraph.model';

@Component({
  selector: 'app-display-paragraph',
  standalone: false,

  templateUrl: './display-paragraph.component.html',
  styleUrl: './display-paragraph.component.scss',
})
export class DisplayParagraphComponent {
  @Input() paragraph!: Paragraph; // Récupère les données du parent
}
