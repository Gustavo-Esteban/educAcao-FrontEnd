<<<<<<< HEAD
import { SobrenosComponent } from './sobrenos/sobrenos.component';
=======
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
>>>>>>> 6592153ec90fe986736d27de8d2ba5b66d8ff5bf
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path: '', redirectTo: 'start', pathMatch:'full'},

  {path: 'start', component: StartComponent},
  {path: 'home', component:HomeComponent},
<<<<<<< HEAD
  {path: 'sobrenos', component:SobrenosComponent}

=======
  {path: 'tema', component: TemaComponent},

  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent}
>>>>>>> 6592153ec90fe986736d27de8d2ba5b66d8ff5bf
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
