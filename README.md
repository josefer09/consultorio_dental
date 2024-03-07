# SISTEMA DE CONSULTORIO CLINICO DENTAL
_Desarrollado por Fernando Hernandez y Miguel Rodriguez_


## Descripción
El sistema a desarrollar será una aplicación web, centrada y hecha con el fin de ayudar a
gestionar los diferentes servicios que ofrece un consultorio dental clínico. La aplicación
tendrá como objetivo el simplificar y gestionar las tareas diarias que se operan en la
clínica, abarca desde el manejo de los clientes (pacientes), hasta la programación de citas
y administración de los expedientes de los clientes.

## Nomenclatura de ***COMMITS***

- Uso de ciertas palabras clave para los commits:
  - **ADD:** Para agregar nuevas funcionalidades o archivos.
  - **UPDATE:** Para actualizar o modificar funcionalidades existentes.
  - **DELETE:** Para eliminar funcionalidades o archivos.
  - **CHANGE:** Para cambios generales o ajustes.

## Valor del equipo de desarrollo

Como equipo de desarrollo, pretendemos simplificar las operaciones de gestión diarias, y
mejorar la calidad de los procesos llevados a cabo dentro de la clínica dental, permitiendo
así al personal del consultorio dental dar el paso a la digitalización, llevando de la mano
todos sus procesos y permitiendo una mejora continua de estos.

## Ramas

El proyecto utiliza tres ramas principales:

- **master (main):** La rama principal del proyecto que refleja el estado estable y desplegable.
- **fernando:** La rama de desarrollo de Fernando, creada para trabajar en funcionalidades específicas.
- **Miguel:** La rama de desarrollo de Miguel, destinada a trabajar en funcionalidades separadas.

Cada desarrollador trabaja en su rama y realiza commits y pruebas en su propia rama antes de fusionar cambios en la rama principal.

## Anexos

En esta sección, puedes listar enlaces a documentos relevantes y otros recursos relacionados con el proyecto. Puedes organizarlo de la siguiente manera:

- **Documento Avance 1:** [Enlace](https://docs.google.com/document/d/1BxA2ydjdqZ6WTvj2p2-z-Osduue6TlheEVA0XyoJoag/edit?usp=sharing).
- **Documento Avance 2:** [Enlace](https://docs.google.com/document/d/1HaEejfnABWB1H0Pt7aJHo5nQviknZpLC/edit?usp=sharing&ouid=106901248031942907636&rtpof=true&sd=true).
- **Diagrama de Entidad:** [Enlace](https://drive.google.com/file/d/1_6HHH1N3XQegaN45530uoMX61dIDSI-z/view?usp=sharingURL).
- **Otros recursos relevantes:** [Carpeta](https://drive.google.com/drive/folders/1Bw5zHaf6gFIq6gZXAPOCSj3ivhO-Vc4q?usp=sharing).
- **Video demostrativa de 3er Avance:** [Carpeta](https://drive.google.com/drive/folders/1ZFVNOdHYUNh6baj1qXoOXGLv7P7aocCJ?usp=drive_link).
- **Video demostrativa de 4to Avance:** [Video](https://drive.google.com/drive/folders/1ZOKxihYcmxTQiWKgWIkwP48DZmHWThYu?usp=sharing).


## Motivación

Nuestra motivación para la elaboración del software en cuestión, van de la mano con múltiples desafíos que enfrentamos en los consultorios hoy en día, como lo son la gestión manual de muchos de los procesos de estos centros de salud, como lo son el manejo de la citas en cuadernos, las facturaciones o el seguimiento de tratamientos.

## Instalación e instrucciones de uso

Para poder probar nuestro repositorio desde su computador, le recomendamos seguir las siguientes instrucciones:

- **Instalación de la BD**
  
    Una vez tengamos clonado nuestro repositorio, deberemos importar la bd que viene incluido en el, para esto deberemos abrir nuestro MySQL Workbench, entrar a nuesra Local Instance

    y posteriormente dirigirnos a la pestaña administration y seleccionar la opción de DataImport/Restore.

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/eb19e485-1ff4-452f-9bce-0dbad039d007)

    Posterior a esto, empezaremos con la importanción, para esto seleccionaremos los ... del primer selector, y seleccionaremos la carpeta db_ClinicaDentalVFinal, que se encuentra dentro

    del repositorio clonado

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/f1f43835-4589-486b-b4ef-0e0d753d8013)


    Seleccionaremos Aceptar, posterior a esto seleccionaremos la opcion de new y escribiremos el nombre de "db_clinicadental", esto creara una nueva schema en nuestro MySql local

    que a su vez sera el cascaron para importar los datos y estructura de la db del repositorio.

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/b254d231-9877-48e8-a400-349b20649e2c)


    Con esto podremos seleccionar la opción de Star Import y se nos comenzara la importación de la bd correctamente:

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/0eb25ea8-f803-4758-a550-894136bd62e0)


    Exito:

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/04f9bc83-6013-4825-8d84-fb7fcbbf84c4)
  

- **Modificación en nuestra db.js**
  
    Con nuestra base de datos importada solo queda modificar el archivo _db.js_ dentro de la carpeta _utils_.

    Dentro del archivo debera modificar el argumento de _**"admin"**_, esto debera ser cambiada por la contraseña de su MySQL, de ser necesarios, los otros argumentos

    tambien pueden ser cambiados por los equivalentes a su configuración de MySQL.

    ![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/687332c0-f9ef-4dd5-8e8d-11bdf18f369b)

## Contacto

**José Fernando:** jose.hernandez228841@potros.itson.edu.mx

**José  Miguel:**  jose.rodriguez216743@potros.itson.edu.mx

## CHAMBEANDING
![image](https://github.com/Ophion09/ConsultorioDental_TopicoWeb/assets/101837336/5010cadb-e4f2-4ce5-8e25-8837fa6e5550)

