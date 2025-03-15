import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  nombre: string = '';
  nombrePareja: string = '';
  aniversario: Date | null = null;

  codigoPareja: string | null = null;

  //Todos los recuerdos creados por defecto
  private recuerdos: albumRecuerdos[] = [
    { 
      titulo: 'Registrado',
      fecha: new Date(2023, 10, 25),
      foto: '',
      completado: false,
    },  
    { 
      titulo: 'No Registrado',
      fecha: new Date(2023, 10, 25),
      foto: '',
      completado: false,
    },  
  ];

  constructor(private firestore: Firestore) {}

  getRecuerdos(): albumRecuerdos[] {
    return this.recuerdos;
  }

  //Esto comprueba si existe un recuerdo con un titulo especifico
  tituloExiste(titulo: string): boolean {
    return this.recuerdos.some(recuerdo => recuerdo.titulo.toLowerCase() === titulo.toLowerCase());
  }

  //Esto se encarga de crear recuerdos de forma local y en Firestore si existe una conexión
  async addRecuerdo(nuevo: albumRecuerdos) {
    this.recuerdos.push(nuevo);

    if (!this.codigoPareja) return;

    try {
      const recuerdoRef = doc(this.firestore, `parejas/${this.codigoPareja}/recuerdos/${nuevo.titulo}`);
      
      const fechaValida = nuevo.fecha instanceof Date && !isNaN(nuevo.fecha.getTime()) 
        ? nuevo.fecha.toISOString() 
        : null;

      await setDoc(recuerdoRef, { ...nuevo, fecha: fechaValida });
      console.log(`Recuerdo "${nuevo.titulo}" subido correctamente.`);
    } catch (error) {
      console.error(`Error al subir el recuerdo "${nuevo.titulo}":`, error);
    }
  }

  //Esto se encarga de eliminar recuerdos de forma local y en Firestore si existe una conexión
  async delRecuerdo(recuerdo: albumRecuerdos) {
    this.recuerdos = this.recuerdos.filter(r => r !== recuerdo);

    if (this.codigoPareja) {
      try {
        const recuerdoRef = doc(this.firestore, `parejas/${this.codigoPareja}/recuerdos/${recuerdo.titulo}`);
        await deleteDoc(recuerdoRef);
        console.log('Recuerdo eliminado de Firestore');
      } catch (error) {
        console.error('Error al eliminar recuerdo de Firestore:', error);
      }
    } else {
      console.warn('No se pudo eliminar de Firestore: Falta ID del recuerdo o código de pareja');
    }
  }

  //Esto se encarga de registrar recuerdos de forma local y en Firestore si existe una conexión
  async registrarRecuerdo(recuerdo: albumRecuerdos) {
    if (!this.codigoPareja) return;

    try {
      const recuerdoRef = doc(this.firestore, `parejas/${this.codigoPareja}/recuerdos/${recuerdo.titulo}`);

      await updateDoc(recuerdoRef, {
        foto: recuerdo.foto,
        fecha: recuerdo.fecha instanceof Date ? recuerdo.fecha.toISOString() : null,
        completado: recuerdo.completado
      });

      console.log(`Recuerdo "${recuerdo.titulo}" actualizado en Firestore.`);
    } catch (error) {
      console.error('Error al actualizar el recuerdo en Firestore:', error);
    }
  }

  //Esto se encarga de editar recuerdos de forma local y en Firestore si existe una conexión
  async editarRecuerdo(recuerdo: albumRecuerdos, nuevoTitulo: string) {
    if (!this.codigoPareja) return;
  
    try {
      const recuerdosRef = `parejas/${this.codigoPareja}/recuerdos`;
  
      const recuerdoOriginalRef = doc(this.firestore, `${recuerdosRef}/${recuerdo.titulo}`);
  
      const nuevoRecuerdo = { ...recuerdo, titulo: nuevoTitulo };
      const nuevoRecuerdoRef = doc(this.firestore, `${recuerdosRef}/${nuevoTitulo}`);
  
      await deleteDoc(recuerdoOriginalRef);

      await setDoc(nuevoRecuerdoRef, nuevoRecuerdo);
  
      console.log(`Recuerdo actualizado: "${recuerdo.titulo}" ahora es "${nuevoTitulo}" en Firestore.`);
    } catch (error) {
      console.error('Error al actualizar el recuerdo en Firestore:', error);
      
    }
    
  }

  //Esto sirve para subir los recuerdos a Firebase
  async subirRecuerdosAFirebase(codigoPareja: string, recuerdos: albumRecuerdos[], firestore: Firestore) {
    if (!this.codigoPareja) return;
    
    const recuerdosRef = collection(firestore, `parejas/${codigoPareja}/recuerdos`);
  
    for (const recuerdo of recuerdos) {
      const docRef = doc(recuerdosRef, recuerdo.titulo);
  
      const fechaValida = recuerdo.fecha instanceof Date && !isNaN(recuerdo.fecha.getTime()) 
        ? recuerdo.fecha.toISOString() 
        : null;
  
      try {
        await setDoc(docRef, { ...recuerdo, fecha: fechaValida }, { merge: true });
        console.log(`Recuerdo "${recuerdo.titulo}" subido correctamente.`);
      } catch (error) {
        console.error(`Error al subir el recuerdo "${recuerdo.titulo}":`, error);
      }
    }
    console.log('LOS RECUERDOS YA FUERON SUBIDOS');
  }

  //Esto escucha cambios en Firebase y sincroniza localmente
  syncRecuerdos() {
    if (!this.codigoPareja) return;
  
    const recuerdosRef = collection(this.firestore, `parejas/${this.codigoPareja}/recuerdos`);
  
    onSnapshot(recuerdosRef, (snapshot) => {
      this.recuerdos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          titulo: data['titulo'],
          fecha: data['fecha']?.toDate ? data['fecha'].toDate() : new Date(data['fecha']),
          foto: data['foto'],
          completado: data['completado'],
        };
      });

      console.log('LOS RECUERDOS YA FUERON BAJADOS');
    });
  }
  
}

interface albumRecuerdos {
  titulo: string;
  fecha: Date;
  foto: string;
  completado: boolean;
}
