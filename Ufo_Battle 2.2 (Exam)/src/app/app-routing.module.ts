import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from './start/start.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {RecordsComponent} from './records/records.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PlayComponent} from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'start', component: StartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'play', component: PlayComponent},
  { path: 'preferences', component: PreferencesComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'score', component: ScoreComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
