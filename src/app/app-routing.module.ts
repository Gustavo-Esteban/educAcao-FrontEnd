import { RedirectComponent } from './redirect/redirect.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';

import { SobrenosComponent } from './sobrenos/sobrenos.component';

import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';

import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemaComponent } from './tema/tema.component';
import { TemaViewComponent } from './view/tema-view/tema-view.component';

const routes: Routes = [

  {path: '', redirectTo: 'start', pathMatch:'full'},

  {path: 'start', component: StartComponent},
  {path: 'home', component:HomeComponent},
  {path: 'sobrenos', component:SobrenosComponent},
  {path: 'tema', component: TemaComponent},
  {path: 'redirect', component: RedirectComponent},

  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},
  {path: 'postagem-delete/:id', component: PostagemDeleteComponent},
  {path: 'user-edit/:id', component: UserEditComponent },
  {path: 'tema-view/:id', component: TemaViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
