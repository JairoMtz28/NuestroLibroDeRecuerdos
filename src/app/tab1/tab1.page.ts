import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAlert, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DataService } from '../data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonAlert, IonButtons, IonIcon],
})
export class Tab1Page {
  recuerdos: albumRecuerdos[] = [];

  nombre: string = '';
  nombrePareja: string = '';
  aniversario: Date | null = null;

  cantidadRecuerdos: number = 0;
  diasRelacion: number = 0;

  hoy: Date = new Date();

  constructor(private dataService: DataService, private alertController: AlertController, private router: Router, private firestore: Firestore) { 
    addIcons({ ellipsisVertical });
  }

  //Esto ayuda a llenar Recuerdos con la información del DataService y actualiza la cantidad de recuerdos con la cantidad de los que ya se hayan completado
  ionViewWillEnter() {
    this.recuerdos = this.dataService.getRecuerdos();

    this.cantidadRecuerdos = this.recuerdos.filter(recuerdo => recuerdo.completado).length;
  }

  //Abre la pantalla de Opciones
  opciones() {
    this.router.navigate(['/opciones']);
  }

  //Esto se encarga de obtener los datos ingresados anteriormente en la pantalla de Inicio
  ngOnInit() {
    this.nombre = this.dataService.nombre;
    this.nombrePareja = this.dataService.nombrePareja;
    this.aniversario = this.dataService.aniversario;

    if (this.aniversario) {
      const diferenciaTiempo = this.hoy.getTime() - new Date(this.aniversario).getTime();
      this.diasRelacion = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    }
  }
  
}

interface albumRecuerdos {
  titulo: string;
  fecha: Date;
  foto: string;
  completado: boolean;
}

