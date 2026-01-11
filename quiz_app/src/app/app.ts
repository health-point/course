import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizList } from '../quiz-list/quiz-list/quiz-list';
import { QuizForm } from "../quiz-form/quiz-form/quiz-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuizList, QuizForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('quiz_app');
  
}
