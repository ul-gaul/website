import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FuseeComponent } from './fusee/fusee.component';
import { EspaceComponent } from './espace/espace.component';
import { StratosComponent } from './stratos/stratos.component';
import { ContactComponent } from './contact/contact.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fusee', component: FuseeComponent },
  { path: 'espace', component: EspaceComponent },
  { path: 'stratos', component: StratosComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'showcase', component: ShowcaseComponent },
  { path: '**', component: PageNotFoundComponent },
];
