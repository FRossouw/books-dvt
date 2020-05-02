import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';
import { HeaderComponent } from './components/header/header.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';


const routes: Routes = [
  {
    path:'book',
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'author',
    component: AuthorComponent,
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
export class AppRoutingModule { }
