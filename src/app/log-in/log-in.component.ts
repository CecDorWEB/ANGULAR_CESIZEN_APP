import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  onSubmit(): void {
    console.log('Formulaire connexion envoyé !');
    console.log(this.LogInfos);
  }

  LogInfos = {
    email: '',
    password: '',
  };
}
