import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';

import { SobrenosComponent } from './sobrenos/sobrenos.component';

import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { OrderModule } from 'ngx-order-pipe';
import { TemaViewComponent } from './view/tema-view/tema-view.component';
import { RedirectComponent } from './redirect/redirect.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    HomeComponent,

    SobrenosComponent,

    TemaComponent,
    TemaEditComponent,
    TemaDeleteComponent,
    PostagemEditComponent,
    PostagemDeleteComponent,
    UserEditComponent,
    TemaViewComponent,
    RedirectComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot()

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
