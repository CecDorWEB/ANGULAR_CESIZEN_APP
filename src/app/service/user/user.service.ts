import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:8080/user';
  private userLogInUrl = 'http://localhost:8080/user/login';
  private userDeleteUrl = 'http://localhost:8080/user/delete';

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

  deleteUser(userId: number): Observable<string> {
    return this.http.post<string>(
      this.userDeleteUrl,
      { id: userId }, // Envoie l'ID dans le corps de la requête
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }
}
