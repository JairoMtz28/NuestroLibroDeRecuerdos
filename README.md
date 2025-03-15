<h1>NuestroLibroDeRecuerdos</h1>
NuestroLibroDeRecuerdos es un proyecto de aplicación móvil desarrollado en el framework Ionic con Angular, pensado para ser utilizado por parejas que deseen guardar recuerdos importantes y con gran valor sentimental para ellos.

## Cómo probar la aplicación

Si alguien desea **descargar el proyecto**, tendrá que realizar algunas instalaciones para que este funcione (y contar con Android Studio o Xcode). A continuación, se mostrarán los **pasos detallados** para que cualquier persona pueda **ejecutar el proyecto desde cero**:

### 1. Clonar el repositorio
Lo primero es descargar el proyecto desde GitHub con el siguiente comando: \
`git clone <URL_DEL_REPOSITORIO>`  \
`cd <NOMBRE_DEL_PROYECTO>`

### 2. Instalar Ionic y Angular CLI
Si no tienes instalado Ionic y Angular CLI, debe hacerlo con: \
`npm install -g @ionic/cli` \
`npm install -g @angular/cli`

### 3. Instalar las dependencias del proyecto
Como `node_modules` no está en el repositorio, deben instalarse las dependencias con: \
`npm install`

### 4. Restaurar las plataformas de Capacitor
Como el proyecto se diseñó principalmente para Android, hay que regenerar la carpeta `android`: \
`ionic cap sync` \
`ionic cap add android`

Si se quiere probar la aplicación en iOS tendrá que ejecutar: \
`ionic cap sync` \
`ionic cap add ios`

### 5. Construir el proyecto
Para generar la carpeta www (que contiene la versión compilada de la app), se debe ejecutar: \
`ionic build`

### 6. Abrir el proyecto en Android Studio (si es necesario)
Si el proyecto es para Android, después de sincronizar Capacitor, se puede abrir en Android Studio con: \
`npx cap open android`

Si es para iOS puede abrir el proyecto en Xcode, use: \
`npx cap open ios`

En cualquiera de los 2 casos solamente hará falta ejecutar el proyecto, ya sea en un emulador/simulador o en un teléfono.

### Nota: 
Si lo deseas también puedes probar la aplicación desde el navegador de la computadora ejecutando: \
`ionic serve`
