import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteContentService } from '../core/site-content.service';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-showcase',
    standalone: true,
    imports: [HeaderComponent, NgbNavModule, TranslatePipe],
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
    readonly siteContent = inject(SiteContentService);

}
