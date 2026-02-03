import { Routes } from '@angular/router';
import { QuizForm } from './components/quiz-form/quiz-form';
import { QuizComponent } from './components/quiz/quiz';   

export const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'create', component: QuizForm },
];
