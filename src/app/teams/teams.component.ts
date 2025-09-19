import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';

@Component({
    selector: 'app-team',
    standalone: true,
    imports: [HeaderComponent, CommonModule, TranslatePipe],
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})
export class TeamComponent {
  // Sections
  teamSections = [
    {
      titleKey: 'fusee.title',
      lead: '',
      members: [
        { name: 'Marc Dupont', role: 'Chef Fusée', photo: './assets/img/team/marc.webp', bio: 'Coordination technique de la division fusée.' },
        { name: 'Jean Tremblay', role: 'Aérostructure', photo: './assets/img/team/jean.webp', bio: 'Conception et fabrication des structures.' }
      ]
    },
    {
      titleKey: 'espace.title',
      lead: '',
      members: [
        { name: 'Sophie Gagnon', role: 'Responsable Avionique', photo: './assets/img/team/sophie.webp', bio: 'Conception des systèmes électroniques embarqués.' },
        { name: 'Lucie Moreau', role: 'Observation', photo: './assets/img/team/lucie.webp', bio: 'Organisation des soirées d\'observation.' }
      ]
    },
    {
      titleKey: 'stratos.title',
      lead: '',
      members: [
        { name: 'Alice Tremblay', role: 'Responsable Stratos', photo: './assets/img/team/alice.webp', bio: 'Coordinateur des vols stratosphériques.' }
      ]
    }
  ];
}