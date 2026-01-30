import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login';
import { RegisterComponent } from '../auth/register/register';
import { QuizList } from '../quiz-list/quiz-list/quiz-list';
import { QuizFormComponent } from '../quiz-form/quiz-form/quiz-form';
import { authGuard } from '../auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'list', component: QuizList, canActivate: [authGuard] },
    { path: 'create', component: QuizFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];