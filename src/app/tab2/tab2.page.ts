import { Component } from '@angular/core';
import { Platform, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, NgFor, NgIf, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon]
})
export class Tab2Page {
  recuerdos: albumRecuerdos[] = [];
  fechaFormateada: String = '';

  //Esto sirve para darle formato a la fecha
  formatoFecha: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
  };
  
  constructor(private router: Router, private dataService: DataService, private platform: Platform) {}

  //Esto ayuda a llenar Recuerdos con la información del DataService y para que al dar click atrás en el telefono nos envíe al inicio
  ionViewWillEnter() {
    this.recuerdos = this.dataService.getRecuerdos();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/tabs/tab1'])
    });
  }

  //Esto se activa al hacer click en cualquiera de los componentes de la lista, enviando especificamente ese componente
  public visualizar(r: any) {
    this.router.navigate(['/visualizar'], { state: { data: r } });
  }

  //Abre la pantalla de Opciones
  opciones() {
    this.router.navigate(['/opciones']);
  }

  //Esto sirve para obtener la información de que si hay recuerdos completados o no, para mostrar nuestro H6
  get hayRecuerdosCompletados(): boolean {
    return this.recuerdos.some(r => r.completado);
  }

  ngOnInit() {
    
  }
  
}
  
interface albumRecuerdos {
  titulo: String;
  fecha: Date;
  foto: string;
  completado: boolean;
}
