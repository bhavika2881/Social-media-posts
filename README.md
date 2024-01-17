# Social-media-posts

## Project Description 
This project is a social media posts application built using Node.js and Express.js. It provides endpoints for managing posts, including retrieving posts, creating new posts, updating post analytics, and deleting posts. The application uses MongoDB as the database to store post data and Redis for caching.

## Setup 

1. Clone the repository to your local machine.
2. Install the required dependencies using 

 ```bash
npm init -y
 npm install express body-parser redis express-rate-limit mongoose ioredis
```

3. Docker setup for Redis in local environment
 ```bash
 docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
 ```

4. Run the server using 
```bash
node index.js
```

5. Open the localhost:3000.

## Infrastructure and Scaling

### Database
The application uses MongoDB to store post data. MongoDB provides flexibility and scalability, making it suitable for storing and retrieving posts efficiently.

### Caching
Redis is used for caching to improve performance. Cached posts are stored and retrieved, reducing the load on the MongoDB database for frequently accessed data.

### Rate Limiting
Express Rate Limit middleware is employed to prevent abuse and ensure fair usage of the application's resources. It limits the number of requests a user can make in a specific time window.

### Docker
Docker is utilized to containerize the Redis instance, ensuring a consistent and reproducible environment across different systems.

## Assumptions

### Redis Container Ports
The Redis container is configured to expose ports 6379 and 8001 for Redis and Redis Commander, respectively. This decision facilitates easy interaction and monitoring of the Redis instance.

### Rate Limit Configuration
The rate limit is set to 100 requests per hour per IP address. This value is chosen as a starting point and can be adjusted based on actual usage patterns and server capacity.

### Docker Compose
Docker Compose is not used in this setup to keep the deployment process simple. For a production environment, a more comprehensive Docker Compose configuration may be necessary.

---
