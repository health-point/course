import { Injectable } from '@angular/core';
import { Quiz, Question } from '../models/quiz.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class QuizService {
  private quizzes: Quiz[] = [];
  private quiz!: Quiz;
  private index!: number;

  getQuizzes(): Observable<Quiz[]> {
    return of(this.quizzes);
  }

  getQuiz(id: number): Observable<Quiz | undefined> {
    return of(this.quizzes.find(quiz => quiz.id === id));
  }

  addQuiz(data: { name: string; description?: string; questions: Question[] }): Observable<Quiz> {
    const newQuiz = { id: Math.max(0, ...this.quizzes.map(q => q.id ?? 0)) + 1, name: data.name, description: data.description, questions: data.questions };
    this.quizzes.push(newQuiz);
    return of(newQuiz);
  }


  updateQuiz(id: number, data: { name: string; description?: string; questions: Question[] }): Observable<Quiz | undefined> {
    const index = this.quizzes.findIndex(quiz => quiz.id === id);
    if (index !== -1) {
      const updatedQuiz = { id, name: data.name, description: data.description, questions: data.questions };
      this.quizzes[index] = updatedQuiz;
      return of(updatedQuiz);
    }
    return of(undefined);
  }

  deleteQuiz(id: number): Observable<void> {
    const index = this.quizzes.findIndex(quiz => quiz.id === id);
    if (index !== -1) {
      this.quizzes.splice(index, 1);
    }
    return of(void 0);
  }

constructor() {
  this.quizzes = [
    {
      id: 1,
      name: "Столицы Европы",
      description: "Проверь свои знания географии",
      questions: [
        {
          text: "Столица Франции?",
          options: ["Лондон", "Берлин", "Париж", "Мадрид"],
          answer: ["Париж"]
        },
        {
          text: "Столица Германии?",
          options: ["Вена", "Берлин", "Варшава", "Прага"],
          answer: ["Берлин"]
        },
        {
          text: "Столица Италии?",
          options: ["Мадрид", "Лиссабон", "Рим", "Афины"],
          answer: ["Рим"]
        }
      ]
    },
    {
      id: 2,
      name: "Простая математика",
      description: "Базовые вычисления для разминки",
      questions: [
        {
          text: "2 + 2 × 2 = ?",
          options: ["8", "6", "4", "10"],
          answer: ["6"]
        },
        {
          text: "10 × (5 - 3) = ?",
          options: ["20", "70", "25", "15"],
          answer: ["20"]
        }
      ]
    },
    {
      id: 3,
      name: "История России",
      questions: [
        {
          text: "В каком году было Крещение Руси?",
          options: ["988", "862", "1147", "1240"],
          answer: ["988"]
        },
        {
          text: "Кто основал Санкт-Петербург?",
          options: ["Пётр I", "Екатерина II", "Иван Грозный", "Александр I"],
          answer: ["Пётр I"]
        }
      ]
    },
    {
      id: 4,
      name: "Классика кино",
      description: "Узнай, насколько ты киноман",
      questions: [
        {
          text: "Кто режиссёр фильма «Крёстный отец»?",
          options: ["Стивен Спилберг", "Фрэнсис Форд Коппола", "Мартин Скорсезе", "Квентин Тарантино"],
          answer: ["Фрэнсис Форд Коппола"]
        },
        {
          text: "В каком году вышел фильм «Титаник»?",
          options: ["1997", "2000", "1995", "1999"],
          answer: ["1997"]
        }
      ]
    },
    {
      id: 5,
      name: "Основы программирования",
      questions: [
        {
          text: "Что выведет console.log(typeof null)?",
          options: ["null", "object", "undefined", "string"],
          answer: ["object"]
        },
        {
          text: "Какой язык используется в Angular по умолчанию для шаблонов?",
          options: ["JavaScript", "TypeScript", "Python", "Dart"],
          answer: ["TypeScript"]
        }
      ]
    },
    {
      id: 6,
      name: "Животный мир",
      description: "Интересные факты о животных",
      questions: [
        {
          text: "Какое животное самое быстрое на суше?",
          options: ["Лев", "Гепард", "Антилопа", "Лошадь"],
          answer: ["Гепард"]
        },
        {
          text: "Сколько сердец у осьминога?",
          options: ["1", "2", "3", "4"],
          answer: ["3"]
        }
      ]
    },
    {
      id: 7,
      name: "Музыка 2000-х",
      questions: [
        {
          text: "Кто исполнил хит «Umbrella»?",
          options: ["Beyoncé", "Rihanna", "Britney Spears", "Lady Gaga"],
          answer: ["Rihanna"]
        },
        {
          text: "Какой альбом Майкла Джексона самый продаваемый?",
          options: ["Bad", "Thriller", "Dangerous", "Off the Wall"],
          answer: ["Thriller"]
        }
      ]
    },
    {
      id: 8,
      name: "Космос",
      description: "Основы астрономии",
      questions: [
        {
          text: "Сколько планет в Солнечной системе?",
          options: ["7", "8", "9", "10"],
          answer: ["8"]
        },
        {
          text: "Какая планета самая большая?",
          options: ["Сатурн", "Юпитер", "Нептун", "Уран"],
          answer: ["Юпитер"]
        }
      ]
    },
    {
      id: 9,
      name: "Еда мира",
      questions: [
        {
          text: "Из какой страны суши?",
          options: ["Китай", "Корея", "Япония", "Таиланд"],
          answer: ["Япония"]
        },
        {
          text: "Основной ингредиент пасты карбонара?",
          options: ["Сливки", "Гуанчиале (свиные щёки)", "Томаты", "Сыр пармезан"],
          answer: ["Гуанчиале (свиные щёки)"]
        }
      ]
    },
    {
      id: 10,
      name: "Спорт",
      questions: [
        {
          text: "В каком виде спорта 11 игроков в команде на поле?",
          options: ["Баскетбол", "Хоккей", "Футбол", "Волейбол"],
          answer: ["Футбол"]
        },
        {
          text: "Сколько колец в олимпийском флаге?",
          options: ["4", "5", "6", "7"],
          answer: ["5"]
        }
      ]
    }
  ];
}

}