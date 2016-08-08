# Icevw

Ejecute código del lado cliente desde el navegador. Hay ciertas tareas que los desarrolladores web deben hacer del lado cliente para acceder a ciertos recursos que son imposibles de acceder desde el navegador. Existen plugins como Java que permiten esto, pero son obsoletos y los navegadores los bloquean. 

IceVW se ejecuta como una aplicación, servicio, que permite ejecutar código NodeJS y obtener resultados desde el navegador. 


### Instalación 

1. Instale primero [nodejs](https://nodejs.org) 
2. Luego instale [vox-core](https://www.npmjs.com/package/vox-core) 
3. Instale icevw
4. Inicie icevw

A continuación mostramos como realizar los pasos 2 a 4:

**Windows**
Abra una ventana **cmd** como administrador. 

```sh
> npm install -g vox-core
> vox -install -g icevw
> icevw
```


**Unix (Osx,Linux)**
Abra la aplicación de **terminal**

```sh
> sudo npm install -g vox-core
> sudo vox -install -g icevw
> icevw
```


Es conocido que en Windows puede surgir problemas de escritura en la consola, por favor en las propiedades de **cmd** seleccione una fuente TrueType



### Instrucciones de compilación de interfaz gráfica

**NOTA**: Esta información está incompleta.

IceVw no necesita compilarse, sin embargo puede compilar, si quiere usar los últimos cambios de [voxcss](https://github.com/voxsoftware/voxcss) framework utilizado para la parte HTML. 

Para ello instale [vox-webcompiler](https://github.com/voxsoftware/vox-webcompiler)

Recuerde que en Windows el comando **sudo** no va, y debe abrir el **cmd** como administrador

```sh
> $ sudo vox -install -g vox-webcompiler
> $ git clone https://github.com/voxsoftware/voxcss
> $ git clone https://github.com/voxsoftware/icevw
> $ cd icevw
> $ vwc -compile ../voxcss --out-dir org/vox/icevw/server/assets
```

Este script copia los archivos del framework voxcss a la carpeta del proyecto IceVW
