import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';
import { BookComponent } from './components/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponent,
    NotLoggedInComponent,
    BookComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
