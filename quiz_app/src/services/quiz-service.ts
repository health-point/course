import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, Question } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private api = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.api}/quizes`, { withCredentials: true });
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.api}/quizes/${id}`, { withCredentials: true });
  }

  addQuiz(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/quizes', data, { withCredentials: true });
  }

  updateQuiz(id: number, data: { name: string; description?: string; questions: Question[] }): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.api}/quizes/${id}`, data, { withCredentials: true });
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/quizes/${id}`, { withCredentials: true });
  }
}