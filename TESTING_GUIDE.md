# Testing Guide

## Overview

This document provides comprehensive guidelines for testing the BarberEase application.

## Testing Strategy

### Testing Pyramid

```
                    /\
                   /  \
                  / E2E \
                 /  Tests \
                /----------\
               /            \
              /  Integration \
             /     Tests      \
            /------------------\
           /                    \
          /     Unit Tests       \
         /                        \
        /--------------------------\
```

- **Unit Tests (70%)**: Test individual components/functions
- **Integration Tests (20%)**: Test component interactions
- **E2E Tests (10%)**: Test complete user workflows

---

## Backend Testing

### Unit Testing

#### Framework
- **JUnit 5** for test cases
- **Mockito** for mocking
- **AssertJ** for assertions

#### Example Unit Test

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void testCreateUser_Success() {
        // Arrange
        User user = new User("John Doe", "john@example.com", "password", "9876543210", User.UserRole.CUSTOMER);
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        // Act
        User result = userService.createUser(user);
        
        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
```

#### Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run specific test method
mvn test -Dtest=UserServiceTest#testCreateUser_Success

# Run with coverage
mvn clean test jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

### Integration Testing

#### Framework
- **Spring Boot Test**
- **TestContainers** for MongoDB
- **MockMvc** for API testing

#### Example Integration Test

```java
@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testRegister_Success() throws Exception {
        RegisterRequest request = new RegisterRequest(
            "John Doe",
            "john@example.com",
            "password123",
            "9876543210",
            User.UserRole.CUSTOMER
        );
        
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.user.email").value("john@example.com"));
    }
}
```

### Test Coverage Goals

| Component | Target Coverage |
|-----------|----------------|
| Services | 90% |
| Controllers | 80% |
| Repositories | 70% |
| Models | 60% |
| **Overall** | **80%** |

---

## Frontend Testing

### Unit Testing

#### Framework
- **Vitest** for test runner
- **React Testing Library** for component testing
- **MSW** for API mocking

#### Example Component Test

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import { store } from '../store'

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })
  
  it('shows validation errors', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    
    fireEvent.click(screen.getByText('Sign in'))
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })
})
```

#### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- LoginPage.test.tsx
```

### E2E Testing (Future)

#### Framework
- **Playwright** or **Cypress**

#### Example E2E Test

```typescript
test('complete booking flow', async ({ page }) => {
  // Login
  await page.goto('http://localhost:5173/login')
  await page.fill('input[name="email"]', 'customer@test.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // Navigate to bookings
  await page.click('text=Bookings')
  await page.click('text=New Booking')
  
  // Select shop and service
  await page.selectOption('select[name="shopId"]', 'shop1')
  await page.selectOption('select[name="serviceId"]', 'service1')
  await page.selectOption('select[name="staffId"]', 'staff1')
  
  // Select date and time
  await page.click('input[type="date"]')
  await page.click('text=Tomorrow')
  await page.click('text=10:00 AM')
  
  // Complete payment
  await page.click('text=Proceed to Payment')
  // ... payment flow
  
  // Verify booking created
  await expect(page.locator('text=Booking Confirmed')).toBeVisible()
})
```

---

## API Testing

### Postman Collection

Use the provided Postman collection: `postman/BarberEase_API_Collection.json`

#### Import Collection

1. Open Postman
2. Click **Import**
3. Select `BarberEase_API_Collection.json`
4. Collection will be added to your workspace

#### Running Tests

1. Set environment variables:
   - `baseUrl`: http://localhost:8080/api
   - `authToken`: (will be set automatically after login)

2. Run collection:
   - Click **Run Collection**
   - Select all requests
   - Click **Run BarberEase API Collection**

### Manual API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "CUSTOMER"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (with token)
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Database Testing

### Test Database Setup

```javascript
// Use separate test database
use barber_ease_test

// Create test data
db.users.insertOne({
  name: "Test User",
  email: "test@example.com",
  password: "$2a$10$hashedpassword",
  phone: "9876543210",
  role: "CUSTOMER",
  active: true
})
```

### Cleanup After Tests

```javascript
// Drop test database
use barber_ease_test
db.dropDatabase()
```

---

## Performance Testing

### Load Testing with Apache JMeter

#### Test Scenarios

1. **Concurrent Users**: 100 users
2. **Ramp-up Time**: 60 seconds
3. **Loop Count**: 10
4. **Scenarios**:
   - User login
   - Browse shops
   - Create booking
   - View bookings

#### Running Load Tests

```bash
jmeter -n -t tests/load/booking_flow.jmx -l results.jtl
```

### Stress Testing

Test application limits:
- Maximum concurrent bookings
- Peak hour simulation
- Database connection pool exhaustion
- Memory leak detection

---

## Security Testing

### OWASP ZAP Scanning

```bash
# Start ZAP in daemon mode
zap.sh -daemon -port 8090

# Run baseline scan
zap-baseline.py -t http://localhost:8080/api

# Run full scan
zap-full-scan.py -t http://localhost:8080/api
```

### Dependency Vulnerability Scanning

```bash
# Backend
mvn dependency-check:check

# Frontend
npm audit

# Fix vulnerabilities
npm audit fix
```

### Security Checklist

- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication bypass
- [ ] Authorization flaws
- [ ] Sensitive data exposure
- [ ] Input validation
- [ ] Rate limiting

---

## Accessibility Testing

### Tools
- **axe DevTools** browser extension
- **WAVE** browser extension
- **Lighthouse** in Chrome DevTools

### Checklist

- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Forms have proper labels
- [ ] Error messages are clear

### Running Accessibility Tests

```bash
# Using Lighthouse
lighthouse http://localhost:5173 --view --preset=desktop

# Check specific page
lighthouse http://localhost:5173/login --view
```

---

## Continuous Integration

### GitHub Actions

Tests run automatically on:
- Every push to `main` or `develop`
- Every pull request
- Nightly builds

### Local CI Simulation

```bash
# Run all checks locally
make quality

# Or manually
cd backend && mvn clean verify
cd frontend && npm run lint && npm test
```

---

## Test Data Management

### Sample Data

Create sample data for testing:

```bash
# Run MongoDB init script
mongosh barber_ease < scripts/mongo-init.js

# Or using Make
make db-seed
```

### Test Users

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@barberease.com | admin123 |
| Shop Owner | owner@barberease.com | admin123 |
| Customer | customer@barberease.com | admin123 |
| Staff | staff@barberease.com | admin123 |

**⚠️ Change these passwords in production!**

---

## Best Practices

### Test Naming

```java
// ✅ Good
@Test
void testCreateBooking_WithValidData_ReturnsCreatedBooking() {}

// ❌ Bad
@Test
void test1() {}
```

### Test Structure (AAA Pattern)

```java
@Test
void testMethodName() {
    // Arrange - Set up test data
    User user = new User();
    
    // Act - Execute the method being tested
    User result = userService.createUser(user);
    
    // Assert - Verify the results
    assertNotNull(result);
    assertEquals("John", result.getName());
}
```

### Test Independence

- Each test should be independent
- Tests should not rely on execution order
- Clean up after each test
- Use `@BeforeEach` and `@AfterEach` appropriately

### Mock vs Real

- **Unit Tests**: Use mocks
- **Integration Tests**: Use real dependencies
- **E2E Tests**: Use complete application

---

## Coverage Reports

### Backend Coverage

View coverage report at: `backend/target/site/jacoco/index.html`

### Frontend Coverage

View coverage report at: `frontend/coverage/lcov-report/index.html`

### Coverage Badges

Add to README:

```markdown
[![Coverage](https://codecov.io/gh/your-repo/barber-ease/branch/main/graph/badge.svg)](https://codecov.io/gh/your-repo/barber-ease)
```

---

## Troubleshooting Tests

### Common Issues

**Issue**: Tests fail with MongoDB connection error

**Solution**:
```bash
# Ensure MongoDB is running
mongosh

# Or use TestContainers
# Add to pom.xml:
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>mongodb</artifactId>
    <scope>test</scope>
</dependency>
```

**Issue**: Frontend tests fail with module not found

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

---

## Test Documentation

### Documenting Tests

```java
/**
 * Test that creating a booking with valid data returns a created booking
 * 
 * Given: A valid booking request
 * When: createBooking is called
 * Then: Returns a saved booking with generated ID
 */
@Test
void testCreateBooking_WithValidData_ReturnsCreatedBooking() {
    // Test implementation
}
```

---

## Resources

- [JUnit 5 Documentation](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

**Last Updated**: November 2024

