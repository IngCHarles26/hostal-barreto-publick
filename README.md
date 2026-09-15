# Hostal Barreto

Sistema web de gestión operativa para un hostal. La aplicación centraliza el trabajo de recepción y administración en un dashboard autenticado: permite controlar la disponibilidad de habitaciones, registrar clientes y estadías, gestionar reservas, registrar pagos y consultar reportes del negocio.

El proyecto está pensado para un entorno real de operación hotelera, con persistencia en PostgreSQL, reglas de integridad en la base de datos y una interfaz preparada para flujos frecuentes de recepción.

## Funcionalidades principales

- **Dashboard protegido:** acceso mediante correo y contraseña, sesiones persistentes y cierre de sesión.
- **Gestión de habitaciones:** mapa visual por piso, tipos de habitación, precios, estado operativo y disponibilidad.
- **Reservas:** creación, consulta y desactivación de reservas, con asociación de una o más habitaciones.
- **Registro de estadías:** ingreso y salida de huéspedes, fechas pagadas, habitación, motivo del viaje, origen, placa, observaciones e imágenes.
- **Clientes:** alta y edición de datos personales, documento de identidad, nacionalidad, contacto, fecha de nacimiento y comentarios.
- **Historial y clientes activos:** consulta de estadías anteriores y seguimiento de huéspedes actualmente alojados.
- **Pagos:** registro de pagos en efectivo o electrónicos, monto, descripción, número de operación y periodo asociado.
- **Reportes:** resumen diario, comentarios operativos y reportes orientados a información estadística de hospedaje (MINCETUR).
- **Usuarios y roles administrativos:** gestión de usuarios y configuración de administradores mediante Better Auth.
- **Integraciones opcionales:** formulario de Google para detalles de estadías y carpetas de Google para organizar imágenes/documentos.
- **Carga de países:** integración con una API externa para obtener países y sus banderas al registrar clientes.

## Flujo de operación

1. Un usuario autorizado inicia sesión.
2. Desde el dashboard consulta el mapa de habitaciones y sus estados: libres, ocupadas, reservadas o deshabilitadas.
3. Registra una reserva o crea directamente una nueva estadía asociando habitación y clientes.
4. Durante la estadía registra pagos, observaciones y datos adicionales del huésped.
5. Al finalizar, registra la salida y conserva la información en el historial.
6. Administración consulta los resúmenes y reportes para el seguimiento diario del hostal.

## Stack tecnológico

### Aplicación

- **Next.js 16** con App Router y React Server Components.
- **React 19** y **TypeScript** para una interfaz tipada y mantenible.
- **Tailwind CSS 4** mediante PostCSS para los estilos de la aplicación.
- **Zustand** para estado compartido en el cliente.
- **Zod** para validación de datos.
- **React Icons** para iconografía de la interfaz.

### Backend y datos

- **Next.js Route Handlers** y Server Actions para endpoints y operaciones del servidor.
- **Prisma ORM 7** con adaptador para PostgreSQL.
- **PostgreSQL 17.3** como base de datos relacional.
- **Better Auth** para autenticación, sesiones, cuentas y administración de usuarios.
- **Docker Compose** para levantar PostgreSQL de forma local.

### Calidad y herramientas

- **ESLint 9** con la configuración de Next.js.
- **Prisma Migrate** para versionar cambios del esquema.
- **pnpm** como gestor de paquetes.
- **Turbopack** durante el desarrollo de Next.js.

## Arquitectura del proyecto

```text
src/
├── app/                 # Rutas, layouts, páginas y Route Handlers de Next.js
│   ├── api/             # Autenticación y endpoints auxiliares
│   ├── dashboard/       # Área privada de operación
│   │   ├── clients/     # Clientes
│   │   ├── rooms/       # Habitaciones y mapa de habitaciones
│   │   ├── stays/       # Estadías, reservas y registro de ingreso/salida
│   │   ├── reports/     # Reportes diarios y MINCETUR
│   │   └── extras/      # Usuarios y funciones administrativas
│   └── login/           # Acceso al sistema
├── components/          # Componentes reutilizables y formularios por dominio
├── lib/
│   ├── server/          # Consultas y acciones del servidor
│   ├── client/          # Utilidades del cliente
│   └── shared/          # Lógica compartida
├── store/               # Stores de Zustand
└── generated/prisma/    # Cliente Prisma generado

prisma/
├── schema.prisma        # Modelos, relaciones, enums e índices
└── migrations/          # Historial versionado de la base de datos
```

## Modelo de datos

El esquema relacional representa las entidades principales del negocio:

- `User`, `Session`, `Account` y `Verification`: autenticación y sesiones administradas por Better Auth.
- `Room` y `RoomActive`: habitaciones, tipo, piso, precio, posición en el mapa y estado operativo.
- `Client` y `Country`: huéspedes, documentos, nacionalidad, datos de contacto y métricas de estadías.
- `Stay` y `ClientInStay`: estadías, clientes alojados, habitación, fechas, motivo y datos operativos.
- `Reservation` y `RoomInReservation`: reservas y habitaciones asociadas.
- `Pay`: pagos vinculados a una estadía o a un periodo de operación.
- `DayComment`: comentarios y notas del reporte diario.

El modelo incorpora relaciones, claves únicas para evitar documentos duplicados, índices para búsquedas de clientes y eliminaciones en cascada donde corresponde.

## Requisitos

- Node.js compatible con Next.js 16.
- pnpm.
- Docker Desktop, o una instancia local de PostgreSQL 17.3.
- Variables de entorno configuradas en un archivo `.env`.

## Puesta en marcha local

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/barreto"
DB_USER="postgres"
DB_NAME="barreto"
DB_PASSWORD="postgres"
ADMIN_IDS="id-de-usuario-administrador"
ADMIN_TOKEN="token-para-operaciones-administrativas"
NEXT_PUBLIC_GOOGLE_FORM_URL=""
API_COUNTRIES=""
API_GOOGLE_FOLDERS=""
GOOGLE_FOLDER_BASE=""
```

`DATABASE_URL` es necesaria para Prisma. `DB_USER`, `DB_NAME` y `DB_PASSWORD` son utilizadas por Docker Compose. `ADMIN_IDS` y `ADMIN_TOKEN` se utilizan en las funciones administrativas. Las variables relacionadas con Google y países son opcionales según las integraciones habilitadas en el entorno.

### 3. Levantar PostgreSQL

El repositorio incluye un servicio Docker para PostgreSQL:

```bash
docker compose up -d postgre-db
```

El servicio expone el puerto `5432` y persiste sus datos en la carpeta local `postgres/`.

### 4. Preparar Prisma

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

### 5. Iniciar la aplicación

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia Next.js en modo desarrollo con Turbopack. |
| `pnpm build` | Genera el cliente Prisma y construye la aplicación para producción. |
| `pnpm start` | Inicia la aplicación previamente construida. |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto. |
| `pnpm exec prisma generate` | Genera el cliente Prisma a partir del esquema. |
| `pnpm exec prisma migrate dev` | Crea y aplica migraciones en desarrollo. |

## Decisiones y cualidades técnicas

- **Separación por dominio:** componentes, páginas y acciones están organizados alrededor de clientes, habitaciones, estadías, reservas y reportes.
- **Seguridad por diseño:** el dashboard valida la sesión antes de renderizar el contenido y el registro público está deshabilitado.
- **Consistencia de datos:** Prisma y PostgreSQL mantienen relaciones explícitas, restricciones únicas, índices y migraciones versionadas.
- **Experiencia operativa:** la aplicación prioriza vistas de consulta, formularios de registro y estados visuales útiles para el trabajo de recepción.
- **Renderizado híbrido:** se aprovechan componentes de servidor para cargar datos y proteger rutas, junto con estado de cliente para interacciones de la interfaz.
- **Mantenibilidad:** TypeScript, validación con Zod, ESLint y una estructura modular facilitan la evolución del sistema.
- **Despliegue reproducible:** Docker simplifica la disponibilidad de la base de datos en desarrollo y las migraciones permiten evolucionar el esquema de forma controlada.

## Estado del proyecto

El proyecto se encuentra en desarrollo activo. La funcionalidad principal de operación del hostal está organizada en el dashboard y el esquema de datos cuenta con migraciones versionadas. Algunas integraciones externas dependen de sus respectivas credenciales y variables de entorno.
