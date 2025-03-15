import { Component } from '@angular/core';
import { Platform, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonSegmentContent, IonList, IonItem, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonSegmentContent, IonList, IonItem, IonIcon, NgFor, NgIf, IonButtons, IonButton],
})
export class Tab3Page {
  recuerdos: albumRecuerdos[] = [];

  constructor(private router: Router, private dataService: DataService, private platform: Platform) {
    addIcons({ checkmarkCircleOutline });
  }

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
  get todosRecuerdosCompletados(): boolean {
    return this.recuerdos.length > 0 && this.recuerdos.every(r => r.completado);
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