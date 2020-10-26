import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PartenairesComponent } from './partenaires.component';

const routes: Routes = [
  { path: '', component: PartenairesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    PartenairesComponent
  ],
  declarations: [PartenairesComponent],
})

export class PartenairesModule { }
