import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StratosComponent } from './stratos.component';

const routes: Routes = [
  { path: '', component: StratosComponent },
];

@NgModule({
  imports: [
    CommonModule, 
    NgbModule, 
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    StratosComponent
  ],
  declarations: [StratosComponent],
})

export class StratosModule { }
