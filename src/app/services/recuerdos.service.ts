import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuerdosService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener recuerdos en tiempo real
  getRecuerdos(parejaId: string): Observable<any[]> {
    return this.firestore.collection('recuerdos', ref => ref.where('parejaId', '==', parejaId)).valueChanges();
  }

  // Agregar un recuerdo
  agregarRecuerdo(parejaId: string, recuerdo: any) {
    return this.firestore.collection('recuerdos').add({ ...recuerdo, parejaId });
  }

  // Editar un recuerdo
  editarRecuerdo(id: string, data: any) {
    return this.firestore.collection('recuerdos').doc(id).update(data);
  }

  // Eliminar un recuerdo
  eliminarRecuerdo(id: string) {
    return this.firestore.collection('recuerdos').doc(id).delete();
  }
}
