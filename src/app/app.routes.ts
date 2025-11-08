import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BalanceGeneralComponent } from './pages/balance-general/balance-general.component';
import { EstadoResultadoComponent } from './pages/estado-resultado/estado-resultado.component';
import { QuestionComponent } from './pages/question/question.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'bg',
    component: BalanceGeneralComponent
  },
  {
    path: 'ER',
    component: EstadoResultadoComponent
  },
  { //esto es para redirigir a la ruta original si se intenta acceder a una no definida
    path: '**',
    redirectTo: ''
  }

];
