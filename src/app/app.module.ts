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
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorFormComponent } from './components/forms/author-form/author-form.component';
import { BookFormComponent } from './components/forms/book-form/book-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputLengthDirectiveDirective } from './forms/directives/input-length-directive.directive';
import { Isbn13DirectiveDirective } from './forms/directives/isbn13-directive.directive';
import { Isbn10DirectiveDirective } from './forms/directives/isbn10-directive.directive';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponent,
    NotLoggedInComponent,
    BookComponent,
    AuthorComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    AuthorFormComponent,
    BookFormComponent,
    InputLengthDirectiveDirective,
    Isbn13DirectiveDirective,
    Isbn10DirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
