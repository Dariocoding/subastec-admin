### Cliente subastec [backend]

## Documentación

Para la estructura de trabajo tenemos la carpeta config en donde colocamos configuración general
carpeta context para las variables globales de la aplicación
Los hooks para reutilizar funciones y de igual manera la carpeta utils

Dentro de la carpeta de css Assets, ya está colocado archivos de css con variables globales de colores
se utiliza bootstrap modificado para la libreria de css

en la carpeta dentro de components podrás ver a Layout y views, dentro de Layout pongo el core de la aplicación
como el diseño de interfaz y reutilización de components y dentro de la carpeta views tengo componentes locales que son de esa vista y también la configuración de esa vista

## En views tenemos

articulos_categorias [Categorias de productos] <br/>
articulos_productos [Productos que se van a relacionar con subastas] <br/>
auth [Pagina de autenticaciones] <br/>
Home [Dashboard del backend] <br/>
pagos [Backend en donde caen todos los pagos] <br/>
settings_paquete_bids [View para modificar los paquetes de bids] <br/>
settings_subastas-destacadas [View para agregar y quitar subastas destacadas] <br/>
usuarios [View para ver todos los usuarios registrados en la aplicación] <br/>

Para el en vivo se utiliza el context de Socket para recibir información de un solo link

Dentro de las variables de entorno tenemos la siguientes variables:

REACT_APP_PUBLIC_URL [server backend imagenes assets] <br/>
REACT_APP_BACKEND_URL [server backend bases de datos]  <br/>
REACT_APP_SOCKET_URL [websocket server] <br/>
REACT_APP_FRONTEND_URL [Pagina de la APP o sea subastec.com] <br/>
