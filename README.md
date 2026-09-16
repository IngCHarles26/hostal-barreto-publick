# Hostal Barreto

Web-based operational management system for a hostel. The application centralizes reception and administration work in an authenticated dashboard: it allows users to control room availability, register clients and stays, manage reservations, record payments, and review business reports.

The project is designed for a real hotel operations environment, with PostgreSQL persistence, database integrity rules, and an interface prepared for frequent reception workflows.

## Main features

- **Protected dashboard:** access through email and password, persistent sessions, and sign-out.
- **Room management:** visual floor map, room types, prices, operational status, and availability.
- **Reservations:** creation, consultation, and deactivation of reservations, with one or more associated rooms.
- **Stay registration:** guest check-in and check-out, paid dates, room, travel purpose, origin, license plate, notes, and images.
- **Clients:** creation and editing of personal information, identity document, nationality, contact details, date of birth, and comments.
- **History and active clients:** consultation of previous stays and tracking of currently hosted guests.
- **Payments:** recording of cash or electronic payments, amount, description, transaction number, and associated period.
- **Reports:** daily summary, operational comments, and reports focused on statistical lodging information (MINCETUR).
- **Users and administrative roles:** user management and administrator configuration through Better Auth.
- **Optional integrations:** Google Form for stay details and Google folders for organizing images/documents.
- **Country loading:** integration with an external API to obtain countries and their flags when registering clients.

## Operational workflow

1. An authorized user signs in.
2. From the dashboard, the user consults the room map and its statuses: available, occupied, reserved, or disabled.
3. The user registers a reservation or directly creates a new stay by associating a room and clients.
4. During the stay, the user records payments, notes, and additional guest information.
5. At the end, the user records the check-out and retains the information in the history.
6. Administration consults summaries and reports for the hostel's daily follow-up.

## Technology stack

### Application

- **Next.js 16** with App Router and React Server Components.
- **React 19** and **TypeScript** for a typed and maintainable interface.
- **Tailwind CSS 4** through PostCSS for application styling.
- **Zustand** for shared client state.
- **Zod** for data validation.
- **React Icons** for interface icons.

### Backend and data

- **Next.js Route Handlers** and Server Actions for endpoints and server operations.
- **Prisma ORM 7** with a PostgreSQL adapter.
- **PostgreSQL 17.3** as the relational database.
- **Better Auth** for authentication, sessions, accounts, and user administration.

### Quality and tooling

- **ESLint 9** with the Next.js configuration.
- **Prisma Migrate** for versioning schema changes.
- **pnpm** as the package manager.
- **Turbopack** during Next.js development.

## Project architecture

```text
src/
├── app/                 # Next.js routes, layouts, pages, and Route Handlers
│   ├── api/             # Authentication and auxiliary endpoints
│   ├── dashboard/       # Private operations area
│   │   ├── clients/     # Clients
│   │   ├── rooms/       # Rooms and room map
│   │   ├── stays/       # Stays, reservations, and check-in/check-out records
│   │   ├── reports/     # Daily and MINCETUR reports
│   │   └── extras/      # Users and administrative functions
│   └── login/           # System access
├── components/          # Reusable components and domain-specific forms
├── lib/
│   ├── server/          # Server queries and actions
│   ├── client/          # Client utilities
│   └── shared/          # Shared logic
├── store/               # Zustand stores
└── generated/prisma/    # Generated Prisma client

prisma/
├── schema.prisma        # Models, relations, enums, and indexes
└── migrations/          # Versioned database history
```

## Data model

The relational schema represents the business's main entities:

- `User`, `Session`, `Account`, and `Verification`: authentication and sessions managed by Better Auth.
- `Room` and `RoomActive`: rooms, type, floor, price, map position, and operational status.
- `Client` and `Country`: guests, documents, nationality, contact information, and stay metrics.
- `Stay` and `ClientInStay`: stays, hosted clients, room, dates, purpose, and operational data.
- `Reservation` and `RoomInReservation`: reservations and associated rooms.
- `Pay`: payments linked to a stay or an operating period.
- `DayComment`: comments and notes for the daily report.

The model includes relations, unique keys to prevent duplicate documents, indexes for client searches, and cascading deletions where appropriate.

## Requirements

- Node.js compatible with Next.js 16.
- pnpm.
- A local PostgreSQL 17.3 instance.
- Environment variables configured in a `.env` file.

## Local setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/barreto"
DB_USER="postgres"
DB_NAME="barreto"
DB_PASSWORD="postgres"
ADMIN_IDS="administrator-user-id"
ADMIN_TOKEN="token-for-administrative-operations"
NEXT_PUBLIC_GOOGLE_FORM_URL=""
API_COUNTRIES=""
API_GOOGLE_FOLDERS=""
GOOGLE_FOLDER_BASE=""
```

`DATABASE_URL` is required by Prisma. `DB_USER`, `DB_NAME`, and `DB_PASSWORD` are used by the local PostgreSQL setup. `ADMIN_IDS` and `ADMIN_TOKEN` are used by administrative functions. The variables related to Google and countries are optional depending on the integrations enabled in the environment.

### 3. Start PostgreSQL

Make sure a PostgreSQL instance is running on port `5432` and that its data is persisted according to your local setup.

### 4. Prepare Prisma

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

### 5. Start the application

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts Next.js in development mode with Turbopack. |
| `pnpm build` | Generates the Prisma client and builds the application for production. |
| `pnpm start` | Starts the previously built application. |
| `pnpm lint` | Runs ESLint on the project. |
| `pnpm exec prisma generate` | Generates the Prisma client from the schema. |
| `pnpm exec prisma migrate dev` | Creates and applies migrations in development. |

## Technical decisions and qualities

- **Domain separation:** components, pages, and actions are organized around clients, rooms, stays, reservations, and reports.
- **Security by design:** the dashboard validates the session before rendering content, and public registration is disabled.
- **Data consistency:** Prisma and PostgreSQL maintain explicit relations, unique constraints, indexes, and versioned migrations.
- **Operational experience:** the application prioritizes consultation views, registration forms, and visual states useful for reception work.
- **Hybrid rendering:** server components are used to load data and protect routes, together with client state for interface interactions.
- **Maintainability:** TypeScript, Zod validation, ESLint, and a modular structure facilitate system evolution.
- **Reproducible deployment:** database availability in development and controlled schema evolution are supported by the project's local setup and migrations.

## Project status

The project is under active development. The main hostel operations functionality is organized in the dashboard, and the data schema has versioned migrations. Some external integrations depend on their respective credentials and environment variables.

---

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
- Una instancia local de PostgreSQL 17.3.
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

`DATABASE_URL` es necesaria para Prisma. `DB_USER`, `DB_NAME` y `DB_PASSWORD` son utilizadas por la configuración local de PostgreSQL. `ADMIN_IDS` y `ADMIN_TOKEN` se utilizan en las funciones administrativas. Las variables relacionadas con Google y países son opcionales según las integraciones habilitadas en el entorno.

### 3. Levantar PostgreSQL

Asegúrate de tener una instancia de PostgreSQL ejecutándose en el puerto `5432` y de que sus datos se persistan según tu configuración local.

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
- **Despliegue reproducible:** la configuración local de la base de datos y las migraciones permiten evolucionar el esquema de forma controlada.

## Estado del proyecto

El proyecto se encuentra en desarrollo activo. La funcionalidad principal de operación del hostal está organizada en el dashboard y el esquema de datos cuenta con migraciones versionadas. Algunas integraciones externas dependen de sus respectivas credenciales y variables de entorno.
