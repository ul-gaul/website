import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgbCarouselModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
