<a href="https://wakatime.com/badge/user/018da7bb-d8cd-4efc-b295-455e1afc3f2c/project/ce4eb5b0-5da0-4fec-a69f-5846d6daec56"><img src="https://wakatime.com/badge/user/018da7bb-d8cd-4efc-b295-455e1afc3f2c/project/ce4eb5b0-5da0-4fec-a69f-5846d6daec56.svg" alt="wakatime"></a>

Live Uptime Page - https://buildstack.cronitorstatus.com/

# BuildStack

BuildStack is a dynamic platform designed to provide users with seamless access to an ecosystem of innovative tools and resources. Built to handle scalability and efficiency, BuildStack leverages modern technologies to deliver a feature-rich and robust user experience.

## Features

- **Frontend**:
  - Developed using **React** for dynamic and responsive interfaces.
  - Styled with **Tailwind CSS** and **DaisyUI** for modern and accessible design.
  - Tested with **Puppeteer** for reliable frontend functionality.
  - Deployed on **Vercel** for fast and secure hosting.

- **Backend**:
  - Built on a **microservices architecture** for modular and scalable development.
  - Written in **Node.js** and **TypeScript** for strong type safety and performance.
  - Database powered by **PostgreSQL** (from **Supabase**) with **Prisma ORM** for efficient and easy data modeling.
  - **MongoDB** is utilized for storing logs of all events.
  - Tested with **Jest** to ensure backend reliability.
  - Dockerized microservices with **Docker** for containerized deployments.
  - Deployed on **Google Cloud Platform (GCP)** for scalability and availability.
  - **Redis** for caching frequently accessed data, reducing latency and improving response times.

- **Planned Features**:
  - **RabbitMQ** integration to support real-time activities like notifications and recent activity tracking.
  - RabbitMQ will be hosted on a Virtual Machine (VM) in **Google Compute Engine (GCE)**.

## Technologies Used

| Category          | Technology                                |
|-------------------|-------------------------------------------|
| Frontend          | React, Tailwind CSS, DaisyUI              |
| Backend           | Node.js, TypeScript                       |
| Database          | PostgreSQL (Supabase), Prisma ORM, MongoDB|
| Testing           | Jest (backend), Puppeteer (frontend)      |
| Deployment        | Vercel (frontend), GCP (backend)          |
| Containerization  | Docker                                    |
| Future Updates    | RabbitMQ                                  |

### User-Service
https://us-central1-buildr-ffca2.cloudfunctions.net/buildstackUserServiceFunction

### Product-Service
https://us-central1-buildr-ffca2.cloudfunctions.net/buildstackProductServiceFunction
