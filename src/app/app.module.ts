import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRouting } from './app-routing';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserAuthGuard } from './shared/guards/user-auth.guard';
import { AdminModule } from './admin/admin.module';
import { IsUserAuthenticatedGuard } from './shared/guards/is-user-authenticated.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    appRouting,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    HttpClientModule,
    RouterModule,
    NavigationModule,
    AdminModule
  ],
  providers: [
    UserAuthGuard,
    IsUserAuthenticatedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
