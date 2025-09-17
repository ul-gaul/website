import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [RouterLink, HeaderComponent, TranslatePipe],
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
