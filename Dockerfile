# Step 1: Use Java 21 to build and run
FROM eclipse-temurin:21-jdk as build
WORKDIR /app
COPY . .
# Build the application
RUN ./mvnw clean package -DskipTests

# Step 2: Final runtime image
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]