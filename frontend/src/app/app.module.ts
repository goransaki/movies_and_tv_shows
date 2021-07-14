import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {routing} from './app.routing';

import {AppComponent} from './app.component';

import {PagesModule} from './pages/pages.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {ToastrModule} from 'ngx-toastr';
import {AuthGuard} from './services/auth.guard';
import {LoginGuard} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    routing,
    PagesModule,
    HttpClientModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      closeButton: true,
      messageClass: 'teo-toast-message',
      preventDuplicates: true,
      timeOut: 10000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      positionClass: 'teo-toast-top-fixed'
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard
  ],
})
export class AppModule {
}
