# Contact Request Processor

![Build Status](https://github.com/esTse/acto-pide-contacto/actions/workflows/ci.yml/badge.svg)
![Deployment Status](https://github.com/esTse/acto-pide-contacto/actions/workflows/Acto%20pide%20contacto/badge.svg)

This repository contains the backend microservice responsible for handling, validating, and processing contact form submissions from the company's main website and landing pages.

## Overview

The **Contact Request Processor** is a critical component of our customer acquisition pipeline. It receives lead data via a RESTful API, validates the input, and queues it for asynchronous processing by our CRM integration layer (simulated in this repo).

### Key Features

-   **REST API**: Simple, versioned endpoints for submission.
-   **Validation**: Strict input validation to ensure data integrity.
-   **Scalable Architecture**: Designed to be deployed as a stateless microservice.
-   **Automated Deployment**: Integrated CI/CD pipeline using GitHub Actions.

## API Reference

### Health Check

`GET /health`

Returns the service health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-10-27T10:00:00.000Z"
}
```

### Submit Contact Request

`POST /contact`

Submits a new contact request for processing.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to know more about your enterprise solutions."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact received",
  "id": "1698400000000"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid contact data"
}
```

## Local Development

### Prerequisites

-   Node.js (v18+)
-   npm

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/esTse/acto-pide-contacto.git
    cd acto-pide-contacto
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

4.  Run tests:
    ```bash
    npm test
    ```

## Deployment

This service is deployed automatically via GitHub Actions.

-   **CI (`ci.yml`)**: Runs linting and unit tests on every push.
-   **Deployment (`contacto.yml`)**: Handles the deployment of the service to our internal processing cluster. This workflow is triggered via `workflow_dispatch` (manual) or `pull_request_target` for hotfixes.

---
© 2023 Acto Technologies. All rights reserved.
