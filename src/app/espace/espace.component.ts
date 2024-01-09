import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-espace',
  standalone: true,
  imports: [HeaderComponent, NgbNavModule],
  templateUrl: './espace.component.html',
  styleUrl: './espace.component.scss'
})
export class EspaceComponent {

}
