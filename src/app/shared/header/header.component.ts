import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subTitle = "";
  @Input() backgroundImg = "";
  @Input() logoUlaval = false;

}
