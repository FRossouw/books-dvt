import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './features/feature-authorization/guards/auth.guard';
import { AuthorFormComponent } from './features/feature-author/components/author-form/author-form.component';
import { BookFormComponent } from './features/feature-book/components/book-form/book-form.component';
import { BookComponent } from './features/feature-book/components/book/book.component';
import { BookDetailsComponent } from './features/feature-book/components/book-details/book-details.component';
import { AuthorComponent } from './features/feature-author/components/author/author.component';
import { AuthorDetailsComponent } from './features/feature-author/components/author-details/author-details.component';
import { ProfileComponent } from './features/feature-profile/components/profile/profile.component';

const routes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book/view/:id',
    component: BookDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book/search/:name',
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book/forms/update/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book/forms/add',
    component: BookFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author',
    component: AuthorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author/view/:id',
    component: AuthorDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author/forms/update/:id',
    component: AuthorFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'author/forms/add',
    component: AuthorFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } // Here
