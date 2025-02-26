import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from '../../model/ressource.model';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  private articleUrl = 'http://localhost:8080/ressource/article';
  private testUrl = 'http://localhost:8080/ressource/test';
  private ressourceUrl = 'http://localhost:8080/ressource';

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.articleUrl);
  }

  getAllTest(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.testUrl);
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.ressourceUrl, ressource);
  }
}
