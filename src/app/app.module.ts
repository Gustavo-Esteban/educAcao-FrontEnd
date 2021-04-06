import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { SobrenosComponent } from './sobrenos/sobrenos.component';
=======
import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
>>>>>>> 6592153ec90fe986736d27de8d2ba5b66d8ff5bf

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    HomeComponent,
<<<<<<< HEAD
    SobrenosComponent
=======
    TemaComponent,
    TemaEditComponent,
    TemaDeleteComponent
>>>>>>> 6592153ec90fe986736d27de8d2ba5b66d8ff5bf
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
