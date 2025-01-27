import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerUrl = 'http://localhost:8080/user';
  private logInUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

  getUser(loginInfo: Partial<User>): Observable<string> {
    return this.http.post<string>(this.logInUrl, loginInfo, {
      responseType: 'text' as 'json',
    });
  }
}
