import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { PieroAmatoComponent } from './Components/piero-amato/piero-amato.component';
import { OfficeComponent } from './Components/office/office.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DasboardComponent } from './Components/dasboard/dasboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './Core/Shared/Dialog/dialog/dialog.component'; // Import the MatDialogModule
import { AuthInterceptor } from './Core/Auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PieroAmatoComponent,
    OfficeComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    DasboardComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
