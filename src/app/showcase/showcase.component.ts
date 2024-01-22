import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [HeaderComponent, NgbNavModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {

}
