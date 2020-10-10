import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FuseeComponent } from './fusee/fusee.component';
import { EspaceComponent } from './espace/espace.component';
import { StratosComponent } from './stratos/stratos.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ContactComponent } from './contact/contact.component';
import { ShowcaseComponent } from './showcase/showcase.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fusee', component: FuseeComponent },
  { path: 'espace', component: EspaceComponent },
  { path: 'stratos', component: StratosComponent },
  { path: 'partenaires', component: PartenairesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'showcase', component: ShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
