# Backend Apply

A NestJS backend application featuring product management.

## Quick Start

Get up and running in 3 steps:

```bash
# 1. Clone and install
git clone <repository-url>
cd backend-apply
cp .env.example .env

# 2. Configure Contentful credentials in .env
# Edit .env and add your CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN

# 3. Start with Docker (includes MongoDB)
docker-compose up -d
```

Access the application:
- **API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs
- **MongoDB:** mongodb://admin:admin123@localhost:27017/backend-apply
