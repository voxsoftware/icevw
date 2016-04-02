# Icevw

**NOTA**: IceVW está en etapa de pruebas. Aún no se recomienda instalar. Se puede bajar solo con motivos de prueba


Ejecute código del lado cliente desde el navegador. Hay ciertas tareas que los desarrolladores web deben hacer del lado cliente para acceder a ciertos recursos que son imposibles de acceder desde el navegador. Existen plugins como Java que permiten esto, pero son obsoletos y los navegadores los bloquean. 

IceVW se ejecuta como una aplicación, servicio, que permite ejecutar código NodeJS y obtener resultados desde el navegador. 


### Instalación 
Primero instale [vox-core](https://www.npmjs.com/package/vox-core) 
Luego en Windows abra una ventana cmd modo administrador, y en Unix utilice sudo

```sh
> $ vox -install -g icevw
```

En Unix

```sh
> $ sudo vox -install -g icevw
```

Es conocido que en Windows puede surgir problemas de escritura en la consola, por favor en las propiedades de cmd seleccione una fuente TrueType



### Instrucciones de compilación

**NOTA**: Esta información está incompleta.

IceVw no necesita compilarse, sin embargo puede compilar, si quiere usar los últimos cambios de [voxcss](https://github.com/voxsoftware/voxcss) framework utilizado para la parte HTML. 

Para ello instale [vox-webcompiler](https://github.com/voxsoftware/vox-webcompiler)

```sh
> $ vox -install -g vox-webcompiler
> $ git clone https://github.com/voxsoftware/voxcss
> $ git clone https://github.com/voxsoftware/icevw}
> $ cd icevw
> $ vwc -compile ../voxcss --out-dir org/vox/icevw/server/assets
```

Este script copia los archivos del framework voxcss a la carpeta del proyecto IceVW
