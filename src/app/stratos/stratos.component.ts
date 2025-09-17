import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-stratos',
    standalone: true,
    imports: [HeaderComponent, TranslatePipe],
    templateUrl: './stratos.component.html',
    styleUrls: ['./stratos.component.scss']
})
export class StratosComponent {

}
