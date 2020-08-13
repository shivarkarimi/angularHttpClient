import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowsComponent } from './shows/shows.component';
import { LoginComponent } from './login/login.component';
import { LoggedInComponent } from './logged-in/logged-in.component';


const routes: Routes = [
  { path: 'shows', component: ShowsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logged-in', component: LoggedInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
