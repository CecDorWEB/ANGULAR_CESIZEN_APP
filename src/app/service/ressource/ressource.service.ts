import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from '../../model/ressource.model';
import { Paragraph } from '../../model/paragraph.model';
import { Question } from '../../model/question.model';
import { Answer } from '../../model/answer.model';
import { ScoringText } from '../../model/scoringText.model';
import { InMemoryScrollingFeature } from '@angular/router';

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
  private paragraphUrl = 'http://localhost:8080/ressource/article';
  private questionUrl = 'http://localhost:8080/ressource/test';
  private responseUrl = 'http://localhost:8080/ressource/test/question';
  private answerUrl = 'http://localhost:8080/ressource/test/question/answer';
  private resultUrl = "http://localhost:8080/results/search"

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.articleUrl);
  }

  getAllTest(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.testUrl);
  }

  getAllRessourcesAllowedByType(
    ressourceTypeId: number
  ): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(
      `${this.ressourceUrl}/all?ressourceTypeId=${ressourceTypeId}`
    );
  }

  getRessourceById(ressourceId: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.ressourceUrl}/${ressourceId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getParagraphListbyArticleId(ressourceId: number): Observable<Paragraph[]> {
    return this.http.get<Paragraph[]>(
      `${this.paragraphUrl}/${ressourceId}/paragraph`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getQuestionListbyTestId(ressourceId: number): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.questionUrl}/${ressourceId}/question`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getResultTestText(ressourceId: number, score :number):Observable<ScoringText>{
    return this.http.get<ScoringText>(
      this.resultUrl,{
      params: {
        ressourceId: ressourceId.toString(),
        score: score.toString()
      }
    });
  }

  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.post<Ressource>(this.ressourceUrl, ressource);
  }

  addParagraph(
    ressourceId: number,
    paragraph: Paragraph
  ): Observable<Paragraph> {
    return this.http.post<Paragraph>(
      `${this.paragraphUrl}/${ressourceId}/paragraph`,
      paragraph
    );
  }

  addQuestion(ressourceId: number, question: Question): Observable<Question> {
    return this.http.post<Question>(
      `${this.questionUrl}/${ressourceId}/question`,
      question
    );
  }

  addAnswer(questionId: number, answer: Partial<Answer>): Observable<Answer> {
    return this.http.post<Answer>(
      `${this.responseUrl}/${questionId}/answer`,
      answer
    );
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

  updateParagraph(paragraph: Paragraph): Observable<any> {
    return this.http.put(
      `${this.paragraphUrl}/paragraph/${paragraph.id}/modify`,
      paragraph
    );
  }

  updateQuestion(question: Question): Observable<any> {
    return this.http.put(
      `${this.questionUrl}/question/${question.id}/modify`,
      question
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

  deleteParagraph(paragraphId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.paragraphUrl}/paragraph/${paragraphId}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }

  deleteQuestion(questionId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.questionUrl}/question/${questionId}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }

  deleteAnswer(answerId: number): Observable<string> {
    return this.http.delete<string>(`${this.answerUrl}/${answerId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json',
    });
  }
}
