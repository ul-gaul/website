import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FuseeComponent } from './fusee/fusee.component';
import { EspaceComponent } from './espace/espace.component';
import { StratosComponent } from './stratos/stratos.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ContactComponent } from './contact/contact.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'fusee', loadComponent: () => import('./fusee/fusee.component').then(m => m.FuseeComponent) },
  { path: 'espace', loadComponent: () => import('./espace/espace.component').then(m => m.EspaceComponent) },
  { path: 'stratos', loadComponent: () => import('./stratos/stratos.component').then(m => m.StratosComponent) },
  { path: 'partenaires', loadComponent: () => import('./partenaires/partenaires.component').then(m => m.PartenairesComponent) },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
  { path: 'showcase', loadComponent: () => import('./showcase/showcase.component').then(m => m.ShowcaseComponent) },
  { path: '**', loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
];
