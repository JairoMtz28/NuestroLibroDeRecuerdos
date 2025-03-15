import { Component, EnvironmentInjector, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonFabList, IonAlert, IonInput, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, addSharp, createOutline, pencilOutline, book, heart, reorderFour, home } from 'ionicons/icons';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonFabList, IonAlert, IonInput, IonToast],
})
export class TabsPage {
  //Esto es para nuestro Toast
  @ViewChild('toast') toast!: IonToast;
  mensajeToast: string = '';

  titulo: String = '';

  // Configuración de los inputs del alert
  alertInputs = [
    {
      name: 'nombre',
      type: 'text',
      placeholder: 'Nombre del recuerdo',
      value: '',
    },
  ];

  // Configuración de los botones del alert
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Crear',
      role: 'confirm',
      handler: (data: { nombre: string; }) => {
        if (data.nombre.trim() !== '') {
          this.titulo = data.nombre.trim();
          
          this.guardar();
        }
      },
    },
  ];

  constructor(private router: Router, private dataService: DataService, private platform: Platform) {
    addIcons({ triangle, ellipse, square, addSharp, createOutline, pencilOutline, book, heart, reorderFour, home });
  }

  //Este método sirve para que al abrir el Ion Alert este obtenga el foco y abra nuestro teclado
  focusInput() {
    setTimeout(() => {
      const firstInput = document.querySelector('ion-alert input') as HTMLInputElement;
      firstInput.focus();
    })
  }

  //Esto nos sirve para guardar la información obtenida de nuestrio IonAlert en nuestro DataService además de que muestra nuestro Toast y comprueba si ya existe un recuerdo con el mismo nombre
  async guardar() {
    if (this.dataService.tituloExiste(this.titulo.trim())) {
      this.mensajeToast = 'Este recuerdo ya existe';

      if (this.toast) {
        await this.toast.present();
      }

      return;
    }
    else {
      this.mensajeToast = 'Recuerdo creado';
      this.dataService.addRecuerdo({ titulo: this.titulo.trim(), fecha: new Date(), foto: '', completado: false, });
    }

    this.router.navigate(['/tabs/tab3']);

    if (this.toast) {
      await this.toast.present();
    }
  }

  //Este evento se encarga de borrar la información de Alert una vez que este se cierra (me costó mucho trabajo hacer que esto funcionara)
  eliminar() {
    this.alertInputs = [...this.alertInputs].map(input => ({
      ...input,
      value: ''
    }));
  }

  //Esto sirve para que, en cualquier lugar de la pantalla con Tabs, al dar click atrás en el telefono nos envíe al inicio
  ionViewWillEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url !== '/tabs/tab1') {
        this.router.navigate(['/tabs/tab1']);
      }
    });
  }
  
  ngOnInit() {
    
  }

}