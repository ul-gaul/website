import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-espace',
    standalone: true,
    imports: [HeaderComponent, NgbNavModule, TranslatePipe],
    templateUrl: './espace.component.html',
    styleUrls: ['./espace.component.scss']
})
export class EspaceComponent {

}
