import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    NgModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, 
    HomeComponent
  ],
  declarations: [HomeComponent],
})

export class HomeModule { }
