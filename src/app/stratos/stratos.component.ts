import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';
import { SiteContentService } from '../core/site-content.service';

@Component({
    selector: 'app-stratos',
    standalone: true,
    imports: [HeaderComponent, TranslatePipe],
    templateUrl: './stratos.component.html',
    styleUrls: ['./stratos.component.scss']
})
export class StratosComponent {
    readonly siteContent = inject(SiteContentService);

}
