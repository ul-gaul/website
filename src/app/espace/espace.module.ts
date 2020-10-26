import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EspaceComponent } from './espace.component';

const routes: Routes = [
  { path: '', component: EspaceComponent },
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    EspaceComponent
  ],
  declarations: [EspaceComponent],
})

export class EspaceModule { }
