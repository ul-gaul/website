import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, NgbCarouselModule, NgbNavModule, HeaderComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
