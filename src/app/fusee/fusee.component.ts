import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '../core/translate.pipe';

interface Rocket {
  id: string;
  name: string;
  year: string;
  image: string;
  competition?: string;
  category?: string;
  ranking?: string;
  altitude?: string;
  showDetails?: boolean;
  specs?: {
    fusee?: {
      dimensions?: string;
      materials?: string;
      flight?: string;
      motor?: string;
      recovery?: string;
    };
    avionique?: {
      ground?: string;
      communication?: string;
      sensors?: string;
      power?: string;
    };
    payload?: { text?: string };
  };
  description?: string;
}

@Component({
  selector: 'app-fusee',
  standalone: true,
  imports: [HeaderComponent, CommonModule, TranslatePipe],
  templateUrl: './fusee.component.html',
  styleUrls: ['./fusee.component.scss']
})
export class FuseeComponent {
  // Liste des fusées
  rockets: Rocket[] = [
    { id: 'next', 
      name: 'À venir', 
      year: '2026', 
      image: './assets/img/page-fusee/fuseeNext.webp', 
      competition: '', 
      category: '',
      ranking: '', 
      altitude: '',
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: '' 
    },
    { id: 'pagoma', 
      name: 'Pagoma', 
      year: '2025', 
      image: './assets/img/page-fusee/fusee2025-2.webp', 
      competition: 'LC', 
      category: '',
      ranking: '', 
      altitude: '',
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Launch Canada 2025' 
    },
    { id: 'altera', 
      name: 'Altéra', 
      year: '2025', 
      image: './assets/img/page-fusee/fusee2025-1.webp', 
      competition: 'IREC', 
      category: '',
      ranking: '', 
      altitude: '', 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'IREC 2025' 
    },
    { id: 'maia', 
      name: 'Maïa', 
      year: '2024', 
      image: './assets/img/page-fusee/fusee2024-2.webp', 
      competition: 'LC', 
      category: '',
      ranking: '4', 
      altitude: "14 470'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Launch Canada 2024' 
    },
    { id: 'merope', 
      name: 'Mérope', 
      year: '2024', 
      image: './assets/img/page-fusee/fusee2024-1.webp', 
      competition: 'SAC', 
      category: '',
      ranking: 'N/A', 
      altitude: "9 784'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Spaceport America Cup 2024' 
    },
    { id: 'nebula', 
      name: 'Nebula', 
      year: '2023', 
      image: './assets/img/page-fusee/fusee2023.webp', 
      competition: 'LC', 
      category: '',
      ranking: '3', 
      altitude: "10 785'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Launch Canada 2023' 
    },
    { id: 'excelsior', 
      name: 'Excelsior', 
      year: '2019', 
      image: './assets/img/page-fusee/fusee2019.webp', 
      competition: 'SAC', 
      category: '',
      ranking: '7', 
      altitude: "22 000'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Spaceport America Cup 2019' 
    },
    { id: 'highv', 
      name: 'High V', 
      year: '2018', 
      image: './assets/img/page-fusee/fusee2018.webp', 
      competition: 'SAC', 
      category: '',
      ranking: '5', 
      altitude: "9 517'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Spaceport America Cup 2018' 
    },
    { id: 'menhir', 
      name: 'Menhir', 
      year: '2017', 
      image: './assets/img/page-fusee/fusee2017.webp', 
      competition: 'SAC', 
      category: '',
      ranking: '16', 
      altitude: "8 015'", 
      showDetails: true,
      specs: {
        fusee: {
          dimensions: 'Longueur: 3.2 m • Diamètre: 0.25 m • Masse: ~22 kg',
          materials: 'Fuselage en composite carbone-époxy, ailerons en aluminium 7075-T6',
          flight: 'Profile de vol suborbital, récupération par parachute principal et secondaire',
          motor: 'Moteur commercial classe M (montage moteur unique, igniteur électrique)',
          recovery: 'Parachute principal + drogue, suivi GPS, balise LoRa'
        },
        avionique: {
          ground: 'Station de réception basée sur SDR et interface web pour télémétrie',
          communication: 'Télémetrie RF avec downlink 915 MHz; redondance de liaisons',
          sensors: 'IMU 9-axes, baromètre haute précision, GPS multi-constellation',
          power: 'Batterie LiPo 4S + régulateurs 5V et 3.3V; alimentation redondante'
        },
        payload: {
          text: 'Charge utile expérimentale: capteurs environnementaux et enregistreur de vol haute fréquence.'
        }
      },
      description: 'Spaceport America Cup 2017' 
    },
    { id: 'ragnarok', 
      name: 'Ragnarök', 
      year: '2016', 
      image: './assets/img/page-fusee/fusee2016.webp', 
      competition: 'SAC', 
      category: '',
      ranking: '4', 
      altitude: "10 086'", 
      showDetails: false,
      specs: {
        fusee: {
          dimensions: '',
          materials: '',
          flight: '',
          motor: '',
          recovery: ''
        },
        avionique: {
          ground: '',
          communication: '',
          sensors: '',
          power: ''
        },
        payload: {
          text: ''
        }
      },
      description: 'Spaceport America Cup 2016' 
    },
    { id: 'blackbird', 
      name: 'Blackbird', 
      year: '2015', 
      image: './assets/img/page-fusee/fusee2015.webp', 
      competition: 'SAC', 
      category: '',
      ranking: 'N/A', 
      altitude: "11 554'", 
      showDetails: false,
      specs: {
        fusee: {
          dimensions: '',
          materials: '',
          flight: '',
          motor: '',
          recovery: ''
        },
        avionique: {
          ground: '',
          communication: '',
          sensors: '',
          power: ''
        },
        payload: {
          text: ''
        }
      },
      description: 'Spaceport America Cup 2015' 
    },
  ];

  selected: Rocket | null = this.rockets.length ? this.rockets[0] : null;

  selectRocket(r: Rocket) {
    if (typeof r.showDetails === 'undefined') {
      r.showDetails = !!r.specs;
    }
    this.selected = r;
  }

  toggleDetails(r: Rocket) {
    r.showDetails = !r.showDetails;
  }
    // scroll doux vers la zone détails (optionnel)
    // const el = document.getElementById('fusee-details');
    // if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
