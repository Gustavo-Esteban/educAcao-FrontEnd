import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'start', pathMatch:'full'},

  {path: 'start', component: StartComponent},
  {path: 'home', component:HomeComponent},
  {path: 'sobrenos', component:SobrenosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
