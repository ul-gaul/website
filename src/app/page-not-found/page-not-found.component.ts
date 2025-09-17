import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [RouterLink, HeaderComponent],
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
