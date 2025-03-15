import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonButtons, IonButton, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, grid, information, menu, people, person, colorPalette, calendar } from 'ionicons/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonButtons, IonButton, IonText]
})
export class OpcionesPage implements OnInit {

  constructor(private platform: Platform, private router: Router) { 
    addIcons({ person, menu, grid, information, people, chevronBack, colorPalette, calendar });
  }

  navegar(titulo: string) {
    this.router.navigate(['/ajustes'], { state: { data: titulo } });
  }

  //Esto sirve para volver haciendo click en el botón de la esquina superios izquierda
  volver() {
    this.router.navigate(['/tabs/tab1']);
  }

  //Esto sirve para poder volver haciendo click en el botón del teléfono
  ionViewWillEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/tabs/tab1'])
    });
  }

  ngOnInit() {
    
  }

}
