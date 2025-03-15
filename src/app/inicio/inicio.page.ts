import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonDatetime, IonButton, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonDatetime, IonButton, IonToast]
})
export class InicioPage implements OnInit {
  nombre: string = '';
  nombrePareja: string = '';
  aniversario: Date | null = null;

  fechaHoy = new Date();

  constructor(private router: Router, private dataService: DataService, private toastController: ToastController) { }

  //Esto nos sirve para guardar la información que obtenemos en nuestro DataService
  async iniciar() {
    this.dataService.nombre = this.nombre;
    this.dataService.nombrePareja = this.nombrePareja;
    this.dataService.aniversario = this.aniversario;

    this.router.navigate(['/tabs']);

    /*const toast = await this.toastController.create({
      message: '¡Bienvenido!',
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();*/
  }
  
  //Esto se encarga de que la información haya sido llenada correctamente para poder avanzar
  get boton(): boolean {
    return this.nombre.trim() !== '' && this.nombrePareja.trim() !== '' && this.aniversario !== null && new Date(this.aniversario) <= new Date();

  }

  ngOnInit() {
  }
}
