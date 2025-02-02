import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:8080/user';
  private userLogInUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  getUser(loginInfo: Partial<User>): Observable<string> {
    return this.http.post<string>(this.userLogInUrl, loginInfo, {
      responseType: 'text' as 'json',
    });
  }
}
