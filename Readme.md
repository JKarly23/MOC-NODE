# MOC-NODE

Proyecto de **Monitorización de Servicios** desarrollado en Node.js, siguiendo los principios de **Clean Architecture**.

## Descripción

Este proyecto permite monitorear el estado de un servicio (UP/DOWN) y registrar logs sobre su disponibilidad. Gracias a su arquitectura limpia, es posible utilizar diferentes fuentes de datos para almacenar los registros:

- **FileSystem**
- **MongoDB**
- **PostgreSQL**

## Características

- Monitoreo automático del estado de servicios.
- Registro de logs detallados sobre la disponibilidad.
- Arquitectura desacoplada y escalable.
- Soporte para múltiples datasources.

## Estructura del Proyecto

- `domain/`: Lógica de negocio y entidades.
- `application/`: Casos de uso.
- `infrastructure/`: Implementaciones de datasources (FileSystem, MongoDB, PostgreSQL).
- `interfaces/`: Adaptadores y controladores.

## Requisitos

- Node.js >= 14.x
- (Opcional) MongoDB o PostgreSQL

## Instalación

```bash
git clone https://github.com/tuusuario/MOC-NODE.git
cd MOC-NODE
npm install
```

## Uso

Configura el datasource deseado en el archivo de configuración y ejecuta el monitor:

```bash
npm start
```

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request.

## Licencia

MIT