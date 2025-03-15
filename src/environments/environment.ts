// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//Implementación de Firestore
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBgRDVY3f9zsd6kmA0qOxRRdyD8HKGhz1E",
    authDomain: "nuestro-libro-de-recuerdos.firebaseapp.com",
    projectId: "nuestro-libro-de-recuerdos",
    storageBucket: "nuestro-libro-de-recuerdos.firebasestorage.app",
    messagingSenderId: "132310244935",
    appId: "1:132310244935:web:1a3c08676cb825b624db62"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
