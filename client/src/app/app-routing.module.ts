import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './produto/editar/editar.component';
import { ListaComponent } from './produto/lista/lista.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produtos', component: ListaComponent},
  {path: 'produtos/:id', component: EditarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
