# Jar API Service

## What this project does

This is a Spring Boot REST API application that stores and retrieves simple `Message` objects.

It exposes a protected endpoint under `/hello` with the following behavior:

- `POST /hello` - save a new message payload
- `GET /hello` - fetch all saved messages
- `DELETE /hello/{id}` - delete a message by its numeric ID

The application currently uses Spring Data JPA and an in-memory H2 database by default.
Basic HTTP authentication protects the `/hello` endpoint.

## How to run the project

### Prerequisites

- Java 21
- Maven (or use the included Maven wrapper `./mvnw`)

### Start locally

From the project root (`/Users/cube/Downloads/jar`):

```bash
./mvnw spring-boot:run
```

Or build and run the packaged jar:

```bash
./mvnw package
java -jar target/jar-0.0.1-SNAPSHOT.jar
```

The service runs by default on `http://localhost:8080`.

## Default security credentials

The application configures a single in-memory user for HTTP Basic authentication:

- username: `user`
- password: `password`

Any request to `/hello` must include these credentials.

## API usage examples

### Get all messages

```bash
curl -u user:password http://localhost:8080/hello
```

### Save a new message

```bash
curl -u user:password -H "Content-Type: application/json" -d '{"content":"Hello from another project"}' http://localhost:8080/hello
```

### Delete a message by ID

```bash
curl -u user:password -X DELETE http://localhost:8080/hello/1
```

## Calling the API from another project

You can call this API from another application using any HTTP client.

### Example: JavaScript `fetch`

```js
fetch('http://localhost:8080/hello', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('user:password')
  },
  body: JSON.stringify({ content: 'Hello from React app' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Example: Java `HttpClient`

```java
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://localhost:8080/hello"))
    .header("Content-Type", "application/json")
    .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("user:password".getBytes()))
    .POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"Hello from another project\"}"))
    .build();

HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

## Default database configuration

The project uses H2 in-memory database by default. Current connection settings are in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```

This means:

- data is stored only in memory
- data is lost when the application stops
- no external/local file database is required

## Using an online database instead of local H2

If you want to use a remote online database, update `application.properties` with the correct JDBC connection string and driver.

### Example: PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://<DB_HOST>:5432/<DB_NAME>
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASSWORD>
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Example: MySQL

```properties
spring.datasource.url=jdbc:mysql://<DB_HOST>:3306/<DB_NAME>
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASSWORD>
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### Notes for online databases

- Add the proper JDBC driver dependency to `pom.xml` for PostgreSQL or MySQL.
- Ensure the remote database is reachable from the server or network where this app runs.
- Create the target database and user before starting the application.
- If you do not want to use a local database, do not leave the H2 configuration in place.

## Database schema and model

The app stores messages using the `Message` entity in `src/main/java/com/jar/jar/model/Message.java`.

Fields:

- `id` (Long) - auto-generated primary key
- `content` (String) - the message text

The repository is defined in `src/main/java/com/jar/jar/repository/MessageRepository.java` using Spring Data JPA.

## Important details

- `/hello` is protected by HTTP Basic auth.
- The app currently saves messages and returns all of them on `GET /hello`.
- If no messages exist, the app creates a default message `Hello, World!`.
- The service is a REST API only; there is no frontend in this project.

## Troubleshooting

- If the app does not start, check that Java 21 is installed.
- If authentication fails, verify the username/password is `user`/`password`.
- If using a remote database, verify the `spring.datasource.url` and JDBC driver dependency.
- Use the H2 console at `http://localhost:8080/h2-console` if the H2 console is enabled.

## Summary

This project is a simple Spring Boot REST API for storing and retrieving messages. It is ready to run with H2 in-memory storage, and you can switch to an online database by updating the datasource settings and adding the proper JDBC driver dependency.



thanks !!!

