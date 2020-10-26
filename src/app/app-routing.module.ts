import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fusee', loadChildren: () => import('./fusee/fusee.module').then(m => m.FuseeModule)},
  { path: 'espace', loadChildren: () => import('./espace/espace.module').then(m => m.EspaceModule)},
  { path: 'stratos', loadChildren: () => import('./stratos/stratos.module').then(m => m.StratosModule)},
  { path: 'partenaires', loadChildren: () => import('./partenaires/partenaires.module').then(m => m.PartenairesModule)},
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)},
  { path: 'showcase', loadChildren: () => import('./showcase/showcase.module').then(m => m.ShowcaseModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
