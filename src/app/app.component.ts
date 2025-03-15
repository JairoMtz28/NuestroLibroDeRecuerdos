import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonList],
})
export class AppComponent {
  //Todo este código nos ayuda para que, siempre al iniciar la aplicación por primera vez tenagmos que introducir nuestros datos
  public inicializacion: boolean = false;

  constructor(private router: Router) {
    this.primerUso();
  }

  public primerUso() {
    if(this.inicializacion == false){
      this.router.navigate(['/inicio']);

      this.inicializacion = true;
    }
    else {
      this.router.navigate(['/tabs']);
    }
  }
}
