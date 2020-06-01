import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProfileComponent } from './features/feature-profile/components/profile/profile.component';
import { HeaderComponent } from './features/feature-home-page/components/header/header.component';
import { NotLoggedInComponent } from './features/feature-home-page/components/not-logged-in/not-logged-in.component';
import { BookComponent } from './features/feature-book/components/book/book.component';
import { BookDetailsComponent } from './features/feature-book/components/book-details/book-details.component';
import { BookFormComponent } from './features/feature-book/components/book-form/book-form.component';
import { AuthorComponent } from './features/feature-author/components/author/author.component';
import { AuthorDetailsComponent } from './features/feature-author/components/author-details/author-details.component';
import { AuthorFormComponent } from './features/feature-author/components/author-form/author-form.component';

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
    BookFormComponent
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
