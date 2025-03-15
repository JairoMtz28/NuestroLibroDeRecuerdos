import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonPopover, IonDatetime, IonInput, IonToast, IonButtons, IonBackButton, IonAlert, IonCard } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBack, createOutline, today } from 'ionicons/icons';
import { ToastController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from '../data.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, NgIf, IonIcon, IonPopover, IonDatetime, IonInput, IonToast, IonButtons, IonBackButton, IonAlert, IonCard]
})
export class VisualizarPage implements OnInit {
  //Esto es para nuestro Toast
  @ViewChild('toast') toast!: IonToast;
  toastMessage: string = '';
  
  //r es toda la información que obtenemos de un componente específico de la interfaz creada en DataService
  r: any;
  fechaFormateada: String = '';
  modoEdicion: boolean = false;

  //Esto nos sirve para habilitar el botón de Guardar al momento de usar el Modo Edición
  tituloEditado: string = '';
  botonHabilitado: boolean = false;

  //Esto nos sirve para ponerle el titulo a la página
  tituloPagina: string = 'Ver';

  //Estas serán mis variables temporales al momento de editar un recuerdo
  temporalTitulo: string = '';
  temporalFecha: string = '';
  temporalFoto: string = '';

  //Esto sirve para darle formato a la fecha
  formatoFecha: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
  };

  //Esto es para nuestro Alert que elimina un recuerdo
  public botonesEliminar = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      handler: () => {
        this.eliminarRecuerdo();
      },
    },
  ];

  //Esto es para nuestro Alert de confirmación de salida
  public botonesSalir = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Salir',
      role: 'confirm',
      handler: () => {
        this.salir();
      },
    },
  ];
  backButtonListener: any;

  constructor(private router: Router, private dataService: DataService, private location: Location, private platform: Platform, private firestore: Firestore) {
    addIcons({ createOutline, chevronBack });
  }

  //Sirve para eliminar un recuerdo y mostrar el Toast
  async eliminarRecuerdo() {
    if (this.r) {
      this.dataService.delRecuerdo(this.r);

      if (this.toast) {
        this.toastMessage = "Recuerdo eliminado";
  
        await this.toast.present();
      }

      this.router.navigate(['/tabs/tab1']);
    }
  }

  //Se activa al presionar el botón de Registrar este recuerdo, sirve para obtener la imagen
  async registrar() {
    if (this.modoEdicion == true) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
  
      if (image.webPath) {
        const base64 = await this.convertToBase64(image.webPath);
  
        // ✅ Validamos que no supere 1,000,000 bytes (aprox. 1,333,333 caracteres)
        if (base64.length > 1000000) {
          this.toastMessage = "La imagen es demasiado grande"
          if (this.toast) {
            await this.toast.present();
          }
          return;
        }
  
        this.r.foto = base64;
      }
    } else if (this.r.completado == false) {
      if (this.fechaFormateada == 'Sin fecha') {
        this.r.fecha = new Date();
        this.comprobarFecha();
      }
  
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
  
      if (image.webPath) {
        const base64 = await this.convertToBase64(image.webPath);
  
        // ✅ Validamos que no supere 1,000,000 bytes (aprox. 1,333,333 caracteres)
        if (base64.length > 1000000) {
          this.toastMessage = "La imagen es demasiado grande"
          if (this.toast) {
            await this.toast.present();
          }
          return;
        }
  
        this.r.foto = base64;
      }
    }
  }
  
  // 🔹 Convertir imagen a Base64
  async convertToBase64(photoUri: string): Promise<string> {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result?.toString() || '');
      };
    });
  }
  

  //Esto comprueba si hay una fecha, si la hay le da el formato que queremos
  public comprobarFecha() {
    if (this.r.fecha == 'Invalid Date') {
      this.fechaFormateada = 'Sin fecha';
    }
    else {
      this.fechaFormateada = new Intl.DateTimeFormat('es-ES', this.formatoFecha).format(this.r.fecha);
      this.fechaFormateada = this.fechaFormateada.charAt(0).toUpperCase() + this.fechaFormateada.slice(1);
    }
  }

  //Esto sirve para guardar la fecha seleccionada en el Popover y cerrarlo
  guardarFecha(event: any, popover: IonPopover) {
    this.r.fecha = new Date(event.detail.value);
    
    this.comprobarFecha();

    popover.dismiss();
  }

  //Esto nos envía a la pantalla en la que podemos visualizar los recuerdos completados, completa el recuerdo poniendo Completado como True y muestra nuestro Toast. Además llama a Firestore para actualizar la información de los recuerdos y comprueba si no hay otro recuerdo con ese nombre
  async guardado() {
    this.r.completado = true;
    this.toastMessage = "Recuerdo registrado";

    if (this.modoEdicion) {
      if (!this.dataService.tituloExiste(this.tituloEditado)) {
        this.dataService.editarRecuerdo(this.r, this.tituloEditado);
        this.r.titulo = this.tituloEditado;

        this.toastMessage = "Recuerdo guardado";
      }
      else {
        this.toastMessage = "No se pudo cambiar el nombre"
      }
    }

    if (this.toast) {
      await this.toast.present();
    }

    this.dataService.registrarRecuerdo(this.r);

    this.router.navigate(['/tabs/tab2']);
  }

  //Esto nos sirve para editar la información del recuerdo activando el Modo Edición y cambia el titulo de la página
  public editarRecuerdo() {
    this.modoEdicion = true;

    this.tituloPagina = 'Editar';
  }

  //Esto nos ayuda a que el Popover funcione correctamente
  abrirPopover(event: Event, popover: IonPopover) {
    popover.event = event;
    popover.present();
  }

  //Esto verifica si hay texto en nuestro Ion-Input al momento de usar el Modo Edición para habilitar o no nuestro botón Guardar
  validarInput() {
    this.botonHabilitado = this.tituloEditado.trim().length > 0;
  }

  //Esto sirve para regresar a la pantalla anterior y/o mostrar la confirmación para salir, hay un caso para cada uno de los titulos y habilitan distintos Alerts
  volver() {
    if (this.tituloPagina == 'Ver') {
      this.location.back();
    }
    else {
      const alert = document.getElementById('salir') as any;
      if (alert) {
        alert.present();
      }
    }
  }

  //Esto sirve para que al confirmar la salida sin guardar nos regrese a la pagina anterior y elimine la información no guardada
  salir() {
    this.location.back();

    if (this.tituloPagina == 'Registrar') {
      this.r.fecha = 'Invalid Date';
      this.r.foto = '';
    }
    
    if (this.tituloPagina == 'Editar') {
      this.r.titulo = this.temporalTitulo;
      this.r.fecha = this.temporalFecha;
      this.r.foto = this.temporalFoto;
    }
  }

  //Esto nos ayuda a guardar la información original del recuerdo cuando este va a ser editado para evitar perderla por si se cancela
  guardarTemporal() {
    this.temporalTitulo = this.r.titulo;
    this.temporalFecha = this.r.fecha;
    this.temporalFoto = this.r.foto;
  }

  //Esto nos ayuda al error que presentamos al implementar el botón de Eliminar, nos ayuda a mostrar nuestro Alert
  async mostrarAlertaEliminar() {
    const alert = document.getElementById('eliminar-alert') as any;
    if (alert) {
      await alert.present();
    }
  }

  //Esto sirve para obtener la información del componente especifico que hemos seleccionado y le da formato inicial a la fecha, además ayuda al Modo Edición y a mostrar un Alert para cuando se de click atrás con el teléfono
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.r = navigation.extras.state['data'];

      this.comprobarFecha();
    }

    this.tituloEditado = this.r.titulo;
    this.validarInput();

    if (!this.r.completado) {
      this.tituloPagina = 'Registrar';
    }

    this.guardarTemporal();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.volver();
    });
  }
}
