import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
import { EsemenyFrissitComponent } from './esemeny-frissit/esemeny-frissit.component';
import { EsemenyLetrehozComponent } from './esemeny-letrehoz/esemeny-letrehoz.component';
import { EsemenyListazComponent } from './esemeny-listaz/esemeny-listaz.component';
import { LoginComponent } from './login/login.component';
import { MailComponent } from './mail/mail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { SzerepComponent } from './szerep/szerep.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: "", component: EsemenyListazComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "letrehoz", component: EsemenyLetrehozComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin', 'irolvas', 'torol'] } },
  { path: "listaz", component: EsemenyListazComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin', 'irolvas', 'torol'] } },
  { path: "listaz/:id/edit", component: EsemenyFrissitComponent },
  { path: "profil", component: ProfilComponent, canActivate: [AuthGuard] },
  { path: "szerep", component: SzerepComponent },
  { path: "mail", component: MailComponent },
  { path: "update-password/:resetToken/:userId", component: UpdatePasswordComponent },
  { path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin'] } },
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
