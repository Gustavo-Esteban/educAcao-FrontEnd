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
import { SobrenosComponent } from './sobrenos/sobrenos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    HomeComponent,
    SobrenosComponent
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
