import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LectureListComponent } from './pages/lecture-list/lecture-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MapDirectionsComponent } from './pages/map-directions/map-directions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
  path: 'dashboard', component: AdminComponent,
    children: [
      { path: '', component:  AdminHomeComponent},
      {path: 'lecture/all', component: LectureListComponent},
      {path: 'student/all', component: StudentListComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'map/direction', component: MapDirectionsComponent}
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
