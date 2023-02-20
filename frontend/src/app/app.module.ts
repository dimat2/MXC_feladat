import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { EsemenyLetrehozComponent } from './esemeny-letrehoz/esemeny-letrehoz.component';
import { EsemenyService } from './services/esemeny.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EsemenyListazComponent } from './esemeny-listaz/esemeny-listaz.component';
import { EsemenyListazFelhasznaloComponent } from './esemeny-listaz-felhasznalo/esemeny-listaz-felhasznalo.component';
import { EsemenyFrissitComponent } from './esemeny-frissit/esemeny-frissit.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { BlockUIModule } from 'ng-block-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { SzerepComponent } from './szerep/szerep.component';
import { AuthGuard } from './auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    EsemenyLetrehozComponent,
    EsemenyListazComponent,
    EsemenyListazFelhasznaloComponent,
    EsemenyFrissitComponent,
    SzerepComponent,
    AdminPanelComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    MatTableModule,
    MatButtonModule,
    MatSortModule
  ],
  providers: [AuthService, EsemenyService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
