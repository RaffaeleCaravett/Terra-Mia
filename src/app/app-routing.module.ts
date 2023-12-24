import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PieroAmatoComponent } from './Components/piero-amato/piero-amato.component';
import { OfficeComponent } from './Components/office/office.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DasboardComponent } from './Components/dasboard/dasboard.component';
import { AuthGuard } from './Core/Guard/Auth.guard';

const routes: Routes = [
{
  path:'',
  component:HomeComponent
},
{
  path:'pieroAmato',
  component:PieroAmatoComponent
},
{
  path:'office',
  component:OfficeComponent
},
{
  path:'dashboard',
  component:DasboardComponent,
  canActivate: [AuthGuard]
},
{
  path:'**',
  component:NotFoundComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
