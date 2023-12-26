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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DasboardComponent } from './Components/dasboard/dasboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './Core/Shared/Dialog/dialog/dialog.component'; // Import the MatDialogModule
import { AuthInterceptor } from './Core/Auth.interceptor';
import { OrderDialogComponent } from './Core/Shared/Dialog/order-dialog/order-dialog.component';
import { BillComponent } from './Core/Shared/Dialog/bill/bill.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AddOrRemoveIngredientDialogComponent } from './Core/Shared/Dialog/add-or-remove-ingredient-dialog/add-or-remove-ingredient-dialog.component';

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
    DialogComponent,
    OrderDialogComponent,
    BillComponent,
    AddOrRemoveIngredientDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
