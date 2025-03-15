//Este archivo sirve para generar una UUID a los usuarios, para conectar a las parejas uno con el otro
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de instalar con: npm install uuid

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  constructor(private firestore: Firestore) {}

  async generarCodigo(email: string): Promise<string> {
    const codigo = uuidv4().substring(0, 6).toUpperCase(); // Genera un código único de 6 caracteres
    const parejaRef = doc(this.firestore, `parejas/${codigo}`);
    
    await setDoc(parejaRef, { usuario1: email, recuerdos: [] });
    
    return codigo;
  }

  async unirAPareja(email: string, codigo: string): Promise<boolean> {
    const parejaRef = doc(this.firestore, `parejas/${codigo}`);
    const parejaSnap = await getDoc(parejaRef);

    if (!parejaSnap.exists()) {
      return false; // Código inválido
    }

    await setDoc(parejaRef, { usuario2: email }, { merge: true });
    return true; // Unión exitosa
  }
}
