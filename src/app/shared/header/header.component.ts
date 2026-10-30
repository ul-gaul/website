import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteContentService } from '../../core/site-content.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly siteContent = inject(SiteContentService);
  @Input() title = "";
  @Input() subTitle = "";
  @Input() backgroundImg = "";
  @Input() logoUlaval = false;

}
