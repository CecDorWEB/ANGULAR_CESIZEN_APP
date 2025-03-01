import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-ressource',
  standalone: false,

  templateUrl: './modify-ressource.component.html',
  styleUrl: './modify-ressource.component.scss',
})
export class ModifyRessourceComponent {
  type: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
    });
  }

  retour() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
