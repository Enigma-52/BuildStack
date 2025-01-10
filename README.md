<a href="https://wakatime.com/badge/user/018da7bb-d8cd-4efc-b295-455e1afc3f2c/project/ce4eb5b0-5da0-4fec-a69f-5846d6daec56"><img src="https://wakatime.com/badge/user/018da7bb-d8cd-4efc-b295-455e1afc3f2c/project/ce4eb5b0-5da0-4fec-a69f-5846d6daec56.svg" alt="wakatime"></a>

## Backend Deployment Links

### User-Service
https://us-central1-buildr-ffca2.cloudfunctions.net/buildstackUserServiceFunction

### Product-Service
https://us-central1-buildr-ffca2.cloudfunctions.net/buildstackProductServiceFunction

# Frontend

## To Be Added

# Backend

## Services

### User Service (Port: 3000)
- Authentication (JWT)
- User Management
- Profile Operations

### Product Service (Port: 3001)
- Product Operations
- Basic Setup

## Tech Stack
- Node.js & TypeScript
- Express
- PostgreSQL with Prisma
- JWT Authentication
- Docker & Docker Compose
- Prometheus & Grafana

## Monitoring
- Prometheus (Port: 9090)
- Grafana (Port: 3030)

## Quick Start
```bash
# Clone and install
git clone <repo>
cd microservices
npm install

# Start services
docker-compose up -d
```

## API Endpoints

### Auth
```bash
POST /api/auth/signup    # Register user
POST /api/auth/login     # Login user
GET /api/auth/profile    # Get profile (Protected)
```

## Database Schema

```bash
model User {
    id                String   @id @default(uuid())
    name              String   @unique
    email             String   @unique
    password          String
    full_name         String
    bio               String?
    profile_image_url String?
    website_url       String?
    twitter_handle    String?
    createdAt         DateTime @default(now())
    updatedAt         DateTime @updatedAt
    karma_points      Int      @default(0)
    is_maker          Boolean  @default(false)
    location          String?
    skills            String[] @default([])
}
```