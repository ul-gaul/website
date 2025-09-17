import { Component } from '@angular/core';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [TranslatePipe],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

}
