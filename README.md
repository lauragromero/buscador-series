¡Web para buscar y seleccionar tus series favoritas!

![BuscadordeSeries](./readmeImage.png)

El proyecto se trata de una web, donde buscar series y poder añadirlas a una lista de favotitos. 
El primer paso, es ir al campo de búsqueda e introducir el nombre de una serie, se caragará una lista de series que coinciden con la búsqueda, haciendo click sobre ellas se añaden a la lista de favoritas, que se queda almacenada en el LocalStorage, estando disponible, al entrar de nuevo en la pagina o refrescar la página. Con el botón de eliminar favoritas se elimina la lista completa y se pueden eiminar de una en una. 

Se ha usado HTML Y SASS para la maquetación, y JavaScript para hacer la web dinámica. 

## Estructura del proyecto

La estructura de carpetas tiene esta pinta:

```
/
`- _src
   |- api
   |  |- data.json // para crearnos un servidor de datos local
   |- assets
   |  |- icons
   |  |- images
   |  |- js
   |  `- scss
   |     `- core
   |
   `- templates
      `- partials

```

