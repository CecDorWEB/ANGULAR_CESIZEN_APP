import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-user-management',
  standalone: false,

  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  users$!: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
  }
}
