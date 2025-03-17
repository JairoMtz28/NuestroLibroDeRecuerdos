# NuestroLibroDeRecuerdos

**NuestroLibroDeRecuerdos** es un proyecto de aplicación móvil desarrollado en el framework **Ionic** con **Angular** con conexión a una base de datos de **Firebase**, pensado para ser utilizado por parejas que deseen guardar recuerdos importantes y con gran valor sentimental para ellos.

Este proyecto **aún no está terminado** y contiene funciones que no se han implementado todavía, sigo trabajando en el proyecto para que, una vez terminado, pueda ser publicado y esté disponible para usuarios tanto de **Android** como de **iOS**.

## Funcionamiento

En esta sección se podrá visualizar **cada una de las vistas** que incluye la aplicación, así como una **breve explicación** de estas, resaltando su funcionamiento básico, las **herramientas del framework** que fueron implementadas y como se espera que el **usuario interactúe** con cada vista de la aplicación detalladamete.

### ¡Bienvenido!

Al abrir la aplicación **por primera vez** el usuario visualizará una pantalla de bienvenida, que le pedirá ingresar 3 datos para el funcionamiento de la aplicación:
- Su nombre (o apodo)
- Nombre (o apodo) de su pareja
- Y la fecha de su aniversario

Estos datos serán obtenidos por medio de 2 **ion-label** y un **ion-datetime**, una vez ingresados se habilitará el **ion-button** INICIAR, el cual llevará al usuario a la siguiente pantalla.

<p align="center">
  <img src="https://github.com/user-attachments/assets/c2466102-4dd8-45c1-b1bc-dceee7f881f6" width="300"> <br>
  Página ¡Bienvenido!
</p>

### Inicio

Una vez se haya ingresado a la aplicación se mostrarán 3 pantallas principales las cuales constituyen la **vista principal** de la aplicación, la primera de ellas, la pantalla de **Inicio** nos muestra información del usuario, tal como su nombre y el de su pareja, la cantidad de días que llevan en su relación y por último, la cantidad de recuerdos que tienen juntos.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8dbae7dc-edd1-4326-8487-62d276af0ef2" width="300"> <br>
  Página Inicio
</p>

En esta misma pantalla se pueden observar más elementos tales como un **ion-toolbar**, un **ion-navbar** y un **ion-fab**:

- El **ion-toolbar** mostrará el título de la pantalla en la que se encuentra actualmente, a demás tendrá en él un **ion-button**, representado con un **ion-icon**, que le permitirá al usuario navegar a otra pantalla.

- El **ion-navbar** mostrará las 3 principales secciones de la aplicación, representadas con un **ion-icon**, y permitirá navegar entre ellas.

- Por último, al presionar el elemento **ion-fab** este abrirá un **ion-alert**, cuyo propósito es el de **crear un nuevo recuerdo**, el usuario deberá ingresar un nombre para el nuevo recuerdo en el **ion-input** que se muestra en él; este también cuenta con 2 botones, uno para **CANCELAR** la acción y otro para **CREAR** el recuerdo. Del mismo modo, este **ion-alert** cuenta con una validación, la cual impide crear recuerdos con un nombre vacío, fuera de esto, cualquier nombre para el recuerdo es válido. Una vez introducido un nombre válido para el recuerdo y presionado el botón **CREAR**, se le dirigirá a la página **Menú**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3144e178-c451-40d8-8252-1246d55a04af" width="300"> <br>
  Página Inicio > Crear nuevo recuerdo
</p>

### Menú

Para abrir esta página bastará con situarse en la **vista principal** de la aplicación y en el **navbar** seleccionar la opción llamada **Menú**, tambien se puede acceder a esta automáticamente despues de **crear un nuevo recuerdo**, acción que mostrará un **ion-toast** indicando que se ha creado un nuevo recuerdo con el mensaje **Recuerdo creado**. 

La función de esta página será mostrar una lista seccionada en 2 partes con ayuda de un **ion-segment**; la primera de estas secciones, titulada **TODO**, mostrará una lista con **todos los recuerdos** que han sido creados por el usuario, independientemente de si estos contienen alguna información o no; la segunda sección llamada **SIN COMPLETAR** mostrará unicamente los **recuerdos que no hayan sido registrados**, es decir, aquellos recuerdos que solamente fueron creados pero no se les ha añadido información alguna.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9be0e318-a9c0-4f0d-a2d0-35e25ee45061" width="300"> <br>
  Página Menú
</p>

En esta pantalla tambien se pueden observar los elementos **ion-toolbar**, un **ion-navbar** y el **ion-fab**, los cuales cumplen la misma función que en la pantalla **Inicio**.

## Álbum

Esta es la tercer pantalla que constituye a la **vista principal** de la aplicación, en esta se mostrará una **galería** de los recuerdos que ya hayan sido **registrados**, mostrando su **título** y su **fotografía** dentro de un **ion-card**. Si aún no se ha **registrado** ningún recuerdo, en esta pantalla solo se mostrará el mensaje "Aún no hay recuerdos". 

En esta pantalla tambien se pueden observar los elementos **ion-toolbar**, un **ion-navbar** y el **ion-fab**, los cuales cumplen la misma función que en las pantallas **Inicio** y **Menú**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/25e8fce0-a879-4371-ba89-65455160b73c" width="300"> <br>
  Página Álbum
</p>

Una vez se haya **registrado** al menos un recuerdo, aparecerá en esta pantalla y al presionar sobre él le permitirá acceder a la **pantalla de visualización** de dicho recuerdo.

# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
