import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { QuizModel } from '../model/quiz-model';

const API_BASE_URL = 'http://localhost:5000';

type QuizItemApi = 
  | { type: 'select'; id: number; quizId: number; options: string[] }
  | { type: 'text';   id: number; quizId: number; placeholder: string };

interface QuizResponse {
  id: number;
  name: string;
  description: string;
  items: QuizItemApi[];
}

interface PageResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  quizzes = signal<QuizModel[]>([]);
  total = signal(0);
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  page = signal(1);
  pageSize = signal(4);

  totalPages = computed(() => 
    Math.max(1, Math.ceil(this.total() / this.pageSize()))
  );

  constructor(private http: HttpClient) {
    this.fetchQuizzes();
  }

  goNext() {
    if (this.page() < this.totalPages()) {
      this.page.update(n => n + 1);
      this.fetchQuizzes();
    }
  }

  goPrev() {
    if (this.page() > 1) {
      this.page.update(n => n - 1);
      this.fetchQuizzes();
    }
  }

  fetchQuizzes() {
    this.loading.set(true);
    this.errorMsg.set(null);

    this.http.get<PageResult<QuizResponse>>(`${API_BASE_URL}/api/quizes`, {
      params: { pageNumber: this.page(), pageSize: this.pageSize() },
      withCredentials: true
    })
    .pipe(catchError(err => {
      this.errorMsg.set(
        err?.status === 401 
          ? 'Нужна авторизация' 
          : 'Ошибка загрузки квизов'
      );
      this.quizzes.set([]);
      this.total.set(0);
      this.loading.set(false);
      return of(null);
    }))
    .subscribe(data => {
      if (!data) return;

      const mapped = data.items.map(q => ({
        id: q.id,
        title: q.name,
        description: q.description,
        items: q.items.map(i => 
          i.type === 'select' 
            ? { id: i.id, type: 'select' as const, options: i.options }
            : { id: i.id, type: 'text'   as const, placeholder: i.placeholder }
        )
      }));

      this.quizzes.set(mapped);
      this.total.set(data.totalCount);
      this.loading.set(false);
    });
  }

  createQuiz(
    title: string,
    desc: string,
    questions: Array<
      | { type: 'select'; title: string; description: string; options: string[] }
      | { type: 'text';   title: string; description: string; placeholder: string }
    >
  ) {
    const payload = {
      name: title,
      description: desc,
      items: questions.map(q => 
        q.type === 'select'
          ? { type: 'select', title: q.title, description: q.description, options: q.options }
          : { type: 'text',   title: q.title, description: q.description, placeholder: q.placeholder }
      )
    };

    return this.http.post<QuizResponse>(
      `${API_BASE_URL}/api/quizes`,
      payload,
      { withCredentials: true }
    )
    .pipe(
      tap(() => this.fetchQuizzes()),
      map(() => true),
      catchError(err => {
        this.errorMsg.set(
          err?.status === 401 ? 'Требуется вход в аккаунт' : 'Ошибка создания'
        );
        return of(false);
      })
    );
  }
}