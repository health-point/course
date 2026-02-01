import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Quiz, Question, PagedResult } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private api = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }


  getQuizzes(pageNumber = 1, pageSize = 100): Observable<Quiz[]> {
    // апишка возвращает { items, totalCount, pageNumber, pageSize }, у тебя возвртащаслдя один массив и он получается был пустой 
    // return this.http.get<Quiz[]>(`${this.api}/quizes`, { withCredentials: true });
    // крч ниже подправил
    return this.http
      .get<PagedResult<Quiz>>(`${this.api}/quizes`, {
        params: { pageNumber, pageSize },
        withCredentials: true
      })
      .pipe(map(res => res?.items ?? []));
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.api}/quizes/${id}`, { withCredentials: true });
  }

  addQuiz(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/quizes', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  updateQuiz(id: number, data: { name: string; description?: string; questions: Question[] }): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.api}/quizes/${id}`, data, { withCredentials: true });
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/quizes/${id}`, { withCredentials: true });
  }
}