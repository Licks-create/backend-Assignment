# User Management Backend

## Overview

Welcome to the User Management Backend project! This Node.js and Express.js application provides CRUD operations on a MongoDB database for a User resource. It features proper input validation, error handling, and authentication middleware for secure operations. Jest is employed for both unit and integration tests.

## Table of Contents

- [Requirements](#requirements)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Requirements

1. Node.js and Express.js backend application.
2. MongoDB database for CRUD operations on User resource.
3. User resource fields: id, name, email (unique), phone (unique), password, role.
4. Proper input validation and error handling.
5. Authentication middleware for securing sensitive operations.
6. Jest for unit and integration tests.
7. REST API endpoints: GET /users, GET /users/<id>, POST /users, PUT /users/<id>, DELETE /users/<id>.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (MongoDB ODM)
- Passport.js (Authentication middleware)
- Jest (Testing)

## Getting Started

### Prerequisites

1. Node.js installed
2. MongoDB installed and running
3. NPM (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-backend.git
