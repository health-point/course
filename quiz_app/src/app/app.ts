import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizList } from '../quiz-list/quiz-list/quiz-list';
import { QuizFormComponent } from "../quiz-form/quiz-form/quiz-form";
import { LoginComponent } from '../auth/login/login';
import { RegisterComponent } from '../auth/register/register';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuizList, QuizFormComponent,LoginComponent,RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('quiz_app');
  
}
