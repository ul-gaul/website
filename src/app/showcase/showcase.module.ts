import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcaseComponent } from './showcase.component';

const routes: Routes = [
  { path: '', component: ShowcaseComponent },
];

@NgModule({
  imports: [
    CommonModule, 
    NgbModule, 
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    ShowcaseComponent
  ],
  declarations: [ShowcaseComponent],
})

export class ShowcaseModule { }
