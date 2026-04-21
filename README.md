# Onjava

This repository contains two main projects demonstrating Java and React integration: a Spring Boot backend and a React frontend.

## Projects

### Jar (Java Spring Boot Application)
A Spring Boot application with REST endpoints, security configuration, and a message repository.

- **Location**: `jar/`
- **Main Class**: `com.jar.jar.JarApplication`
- **Features**:
  - REST API with HelloController
  - User authentication and security (JWT)
  - Message model and repository (JPA)

### My React App
A React application that interacts with the Java backend via REST API.

- **Location**: `my-react-app/`
- **Features**:
  - React components
  - API service using Axios for backend communication

## Prerequisites

### Backend (Jar)
- **Java**: JDK 21 (or compatible version)
- **Maven**: 3.6+ (or use included `mvnw` wrapper)
- **Database**: H2 (in-memory by default), or MongoDB/SQLite for alternatives

### Frontend (My React App)
- **Node.js**: 16+ (includes npm)
- **npm**: 7+ (comes with Node.js)

## Installation and Setup

### Backend Setup

1. **Install Java and Maven**:
   - Download and install JDK 21 from [Adoptium](https://adoptium.net/) or Oracle.
   - Maven can be installed from [maven.apache.org](https://maven.apache.org/download.cgi), or use the included `mvnw` script.

2. **Navigate to the backend directory**:
   ```bash
   cd jar
   ```

3. **Build the application** (optional, as Spring Boot handles it):
   ```bash
   ./mvnw clean install
   ```

### Frontend Setup

1. **Install Node.js and npm**:
   - Download from [nodejs.org](https://nodejs.org/).

2. **Navigate to the frontend directory**:
   ```bash
   cd my-react-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running Locally

### Start the Backend
1. Ensure you're in the `jar` directory.
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   - The app will start on `http://localhost:8080`.
   - H2 console available at `http://localhost:8080/h2-console` (login with JDBC URL: `jdbc:h2:mem:testdb`, username: `sa`, password: empty).

### Start the Frontend
1. Ensure you're in the `my-react-app` directory.
2. Start the development server:
   ```bash
   npm start
   ```
   - The app will open at `http://localhost:3000`.

## Database Configuration

### Local In-Memory Database (H2 - Default)
The application uses H2 in-memory database by default. No additional setup required. Data is lost on restart.

### Switching to SQLite (Local File-Based)
1. Add SQLite dependency to `pom.xml`:
   ```xml
   <dependency>
       <groupId>org.xerial</groupId>
       <artifactId>sqlite-jdbc</artifactId>
       <version>3.42.0.0</version>
   </dependency>
   ```

2. Update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:sqlite:database.db
   spring.datasource.driverClassName=org.sqlite.JDBC
   spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
   spring.h2.console.enabled=false
   ```

3. Create the database file (optional, JPA will create it).

### Switching to MongoDB (Cloud/Local)
1. Add MongoDB dependency to `pom.xml`:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-mongodb</artifactId>
   </dependency>
   ```
   Remove H2 dependency if not needed.

2. Update `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/yourdb
   # For cloud MongoDB Atlas, use:
   # spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/yourdb
   ```

3. For local MongoDB:
   - Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).
   - Start MongoDB service.

4. For cloud MongoDB:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas).
   - Create a cluster and get the connection string.

Note: Switching to MongoDB requires changing the repository from JPA to MongoRepository if using document-based storage.

## API Endpoints
- `GET /api/hello` - Hello endpoint
- Other endpoints as defined in controllers.

## Contributing
Feel free to contribute to either project. Ensure both frontend and backend are tested locally before submitting PRs.