import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private ressourceDeleteUrl = 'http://localhost:8080/ressource/delete';
  private ressourceAutorizationUrl =
    'http://localhost:8080/ressource/autorization';

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.articleUrl);
  }

  getAllTest(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.testUrl);
  }

  getRessourceById(ressourceId: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.ressourceUrl}/${ressourceId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.ressourceUrl, ressource);
  }

  updateRessource(ressource: Ressource, type: String): Observable<Ressource> {
    return this.http.put<Ressource>(
      `${this.ressourceUrl}/${type}/${ressource.id}/modify`,
      ressource,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  autorizationRessource(ressourceId: number): Observable<string> {
    return this.http.post<string>(
      this.ressourceAutorizationUrl,
      { id: ressourceId },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }

  deleteRessource(ressourceId: number): Observable<string> {
    return this.http.post<string>(
      this.ressourceDeleteUrl,
      { id: ressourceId }, // Envoie l'ID dans le corps de la requête
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }
}
