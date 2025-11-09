# Backend Apply

Backend API construido con NestJS para gestión de productos con integración a Contentful CMS.

## Stack Tecnológico

- **Framework:** NestJS
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Documentación:** Swagger
- **Testing:** Jest

## Inicio Rápido con Docker

```bash
# 1. Clonar repositorio
git clone <repository-url>
cd backend-apply

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Contentful

# 3. Iniciar con Docker Compose
docker-compose up --build -d

# 4. Ver logs
docker-compose logs -f
```

La aplicación estará disponible en:
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **Health Check:** http://localhost:3000/health

## Comandos Docker

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reconstruir imagen
docker-compose up --build

# Ver logs en tiempo real
docker-compose logs -f app

# Limpiar volúmenes
docker-compose down -v
```

## Desarrollo Local (sin Docker)

```bash
# Instalar dependencias
npm install

# Iniciar MongoDB localmente
# Asegúrate de tener MongoDB corriendo en localhost:27017

# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de código
npm run test:cov

# Tests específicos
npm test -- --testPathPattern="products"
```

## API Endpoints

### Autenticación
- `POST /v1/auth/signin` - Autenticación de usuario

### Productos
- `GET /v1/products` - Listar productos (con filtros y paginación)
- `POST /v1/products/sync` - Sincronizar productos desde Contentful 🔒
- `DELETE /v1/products/:id` - Eliminar producto 🔒

### Reportes
- `GET /v1/reports/non-deleted-products` - Reporte de productos activos 🔒
- `GET /v1/reports/deleted-products` - Reporte de productos eliminados 🔒
- `GET /v1/reports/categories` - Reporte por categorías 🔒

🔒 = Requiere autenticación JWT

## Estructura del Proyecto

```
src/
├── auth/              # Autenticación y autorización
├── products/          # Gestión de productos
│   ├── application/   # Casos de uso
│   ├── domain/        # Entidades y repositorios
│   └── infrastructure/# API y repositorios
├── reports/           # Reportes y estadísticas
├── shared/            # Utilidades compartidas
└── main.ts           # Punto de entrada

test/                  # Tests unitarios
swagger/              # Documentación Swagger
```

## Variables de Entorno

```env
# Aplicación
ENV=production
PORT=3000

# MongoDB
MONGODB_URI=mongodb://mongo/backend-apply

# Contentful
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CONTENT_TYPE=product

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```
