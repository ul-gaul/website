import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FuseeComponent } from '../fusee/fusee.component';

const routes: Routes = [
  { path: '', component: FuseeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    FuseeComponent
  ],
  declarations: [FuseeComponent],
})

export class FuseeModule { }
