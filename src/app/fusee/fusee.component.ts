import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    selector: 'app-fusee',
    imports: [HeaderComponent, CommonModule],
    templateUrl: './fusee.component.html',
    styleUrl: './fusee.component.scss'
})
export class FuseeComponent {
  // Liste des fusées
  rockets = [
    { id: 'next', name: 'À venir', year: '2024-2025', image: './assets/img/page-fusee/fuseeNext.webp', competition: '', ranking: '', altitude: '', description: 'À confirmer' },
    { id: 'maia', name: 'Maïa', year: '2024', image: './assets/img/page-fusee/fusee2024-2.webp', competition: 'LC', ranking: '4', altitude: "14 470'", description: 'Participation Launch Canada 2024' },
    { id: 'merope', name: 'Mérope', year: '2024', image: './assets/img/page-fusee/fusee2024-1.webp', competition: 'SAC', ranking: 'N/A', altitude: "9 784'", description: 'Participation Spaceport America Cup 2024' },
    { id: 'nebula', name: 'Nebula', year: '2023', image: './assets/img/page-fusee/fusee2023.webp', competition: 'LC', ranking: '3', altitude: "10 785'", description: 'Launch Canada 2023' },
    { id: 'excelsior', name: 'Excelsior!', year: '2019', image: './assets/img/page-fusee/fusee2019.webp', competition: 'SAC', ranking: '7', altitude: "22 000'", description: 'Spaceport America Cup 2019' },
    { id: 'highv', name: 'High V', year: '2018', image: './assets/img/page-fusee/fusee2018.webp', competition: 'SAC', ranking: '5', altitude: "9 517'", description: 'Spaceport America Cup 2018' },
    { id: 'menhir', name: 'Menhir', year: '2017', image: './assets/img/page-fusee/fusee2017.webp', competition: 'SAC', ranking: '16', altitude: "8 015'", description: 'Spaceport America Cup 2017' },
    { id: 'ragnarok', name: 'Ragnarök', year: '2016', image: './assets/img/page-fusee/fusee2016.webp', competition: 'SAC', ranking: '4', altitude: "10 086'", description: 'Spaceport America Cup 2016' },
    { id: 'blackbird', name: 'Blackbird', year: '2015', image: './assets/img/page-fusee/fusee2015.webp', competition: 'SAC', ranking: 'N/A', altitude: "11 554'", description: 'Spaceport America Cup 2015' },
  ];

  selected = this.rockets[0];

  selectRocket(r: any) {
    this.selected = r;
    // scroll doux vers la zone détails (optionnel)
    const el = document.getElementById('fusee-details');
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
}
