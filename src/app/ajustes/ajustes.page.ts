import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonInput, IonCard } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SyncService } from '../services/sync.service';
import { DataService } from '../data.service';
import { Firestore } from '@angular/fire/firestore';
import { addIcons } from 'ionicons';
import { eye, eyeOffOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonInput, IonCard]
})
export class AjustesPage implements OnInit {
  titulo: string = '';
  
  codigo: string = '- - - - - -';
  inputCodigo: string = ''; 
  mostrarCodigo: boolean = false;

  constructor(private router: Router, private location: Location, private platform: Platform, private syncService: SyncService, private dataService: DataService, private firestore: Firestore) { 
    addIcons({ eyeOutline, eyeOffOutline });
  }

  //Esto sirve para obtener un UUID generado desde Firebase y se encargará de compartir los recuerdos que ya tengas una vez creada la conexión
  async generarCodigo() {
    if (!this.dataService.codigoPareja) {
      try {
        const email = 'usuario1@example.com'; // Reemplázalo con el email real
        this.codigo = await this.syncService.generarCodigo(email);
  
        this.dataService.codigoPareja = this.codigo;
      } catch (error) {
        console.log('ERROR');
      }
    }
    else {
      this.codigo = this.dataService.codigoPareja;
    }

    this.mostrarCodigo = true;
    
    this.dataService.subirRecuerdosAFirebase(this.codigo, this.dataService.getRecuerdos(), this.firestore);
    this.dataService.syncRecuerdos();
  }

  //Esto sirve para introducir el UUID generado desde Firebase para conectar con la pareja y se encargará de compartir los recuerdos que ya tengas una vez creada la conexión
  async unirAPareja() {
    if (!this.inputCodigo.trim()) {
      return;
    }
    try {
      const email = 'usuario2@example.com'; // Reemplázalo con el email real
      const exito = await this.syncService.unirAPareja(email, this.inputCodigo);
      if (exito) {
        console.log('¡Conexión exitosa!');

        this.codigo = this.inputCodigo.trim();
        this.dataService.codigoPareja = this.codigo;

        console.log('Codigo introducido:', this.dataService.codigoPareja);

        this.dataService.subirRecuerdosAFirebase(this.codigo, this.dataService.getRecuerdos(), this.firestore);
        this.dataService.syncRecuerdos();

        this.router.navigate(['/tabs/tab1']);
      } else {
        console.log('Código inválido. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.log('Error al unirse con la pareja.');
    }
  }

  //Esto sirve para volver haciendo click en el botón de la esquina superios izquierda
  volver() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/opciones'])
    });
  }

  //Esto sirve para obtener el Titulo de la pantalla, lo cual definirá su funcionamiento, además de permitir volver a la pantalla anterior dando click con el botón del teléfono
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.titulo = navigation.extras.state['data'];
    }

  }

}
