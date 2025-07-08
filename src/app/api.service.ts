import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'http://localhost:8080';

  constructor(private Http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.Http.post<any>(`${this.apiUrl}/login`, data, {observe: 'response'});
  }

  getTrivia(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/trivia/start`);
  }

  validate(questionId: number, answerId: number): Observable<any> {
    const body = {questionId, answerId};
    return this.Http.post<any>(`${this.apiUrl}/trivia/validate`, body);
  }

  sendScore(userId: number, date: string, score: number, numberOfQuestions: number): Observable<any> {
    const body = {userId, date, score, numberOfQuestions};
    return this.Http.post<any>(`${this.apiUrl}/trivia/score`, body);
  }

  
 
  
}
