# Multi-stage Docker build for optimized image size

# Stage 1: Build stage
FROM maven:3.9-openjdk-17-slim AS build

WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Create non-root user for security
RUN groupadd -r barberease && useradd -r -g barberease barberease

# Copy only the built artifact from build stage
COPY --from=build /app/target/barber-ease-backend-1.0.0.jar app.jar

# Create logs directory
RUN mkdir -p /app/logs && chown -R barberease:barberease /app

# Switch to non-root user
USER barberease

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# JVM options for containerized environment
ENV JAVA_OPTS="-Xms512m -Xmx1g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

