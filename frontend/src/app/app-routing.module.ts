import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
import { EsemenyFrissitComponent } from './esemeny-frissit/esemeny-frissit.component';
import { EsemenyLetrehozComponent } from './esemeny-letrehoz/esemeny-letrehoz.component';
import { EsemenyListazFelhasznaloComponent } from './esemeny-listaz-felhasznalo/esemeny-listaz-felhasznalo.component';
import { EsemenyListazComponent } from './esemeny-listaz/esemeny-listaz.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SzerepComponent } from './szerep/szerep.component';

const routes: Routes = [
  { path: "", component: EsemenyListazComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "letrehoz", component: EsemenyLetrehozComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin', 'irolvas', 'torol'] } },
  { path: "listaz", component: EsemenyListazComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin', 'irolvas', 'torol'] } },
  { path: "listaz/:id/edit", component: EsemenyFrissitComponent },
  { path: "profil", component: EsemenyListazFelhasznaloComponent, canActivate: [AuthGuard] },
  { path: "szerep", component: SzerepComponent },
  { path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard], data: { permittedRoles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
