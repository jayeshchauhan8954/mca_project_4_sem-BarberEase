# Developer Guide

## Welcome Developer! 👋

This guide will help you understand the BarberEase codebase and contribute effectively.

---

## Quick Links

- [Setup Guide](SETUP_GUIDE.md) - Get started
- [Architecture](ARCHITECTURE.md) - System design
- [API Documentation](API_DOCUMENTATION.md) - API reference
- [Contributing](CONTRIBUTING.md) - How to contribute

---

## Project Overview

### Tech Stack Summary

```
┌─────────────────────────────────────┐
│         Frontend (Port 5173)        │
│  React 18 + TypeScript + Vite       │
│  Redux Toolkit + React Router       │
│  Tailwind CSS + Lucide Icons        │
└─────────────┬───────────────────────┘
              │ REST API
┌─────────────▼───────────────────────┐
│         Backend (Port 8080)         │
│  Spring Boot 3 + Java 17            │
│  Spring Security + JWT              │
│  Spring Data MongoDB                │
└─────────────┬───────────────────────┘
              │ MongoDB Driver
┌─────────────▼───────────────────────┐
│       Database (Port 27017)         │
│  MongoDB 6.0+                       │
└─────────────────────────────────────┘
```

---

## Getting Started

### 1. Clone and Setup

```bash
# Clone repository
git clone https://github.com/your-username/barber-ease.git
cd barber-ease

# Install dependencies
make install

# Or manually
cd backend && mvn install
cd ../frontend && npm install

# Setup database
make db-seed

# Start development
make dev
```

### 2. Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes

# Run tests
make test

# Run linters
make lint

# Commit changes
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/your-feature
```

---

## Backend Development

### Project Structure

```
backend/src/main/java/com/barberease/
├── controller/          # REST API endpoints
│   ├── AuthController.java
│   ├── ShopController.java
│   ├── BookingController.java
│   └── ...
├── service/             # Business logic
│   ├── AuthService.java
│   ├── ShopService.java
│   └── ...
├── repository/          # Data access
│   ├── UserRepository.java
│   ├── ShopRepository.java
│   └── ...
├── model/               # MongoDB entities
│   ├── User.java
│   ├── Shop.java
│   └── ...
├── dto/                 # Data transfer objects
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   └── ...
├── security/            # Security configuration
│   ├── JwtTokenProvider.java
│   ├── SecurityConfig.java
│   └── ...
├── exception/           # Custom exceptions
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java
└── config/              # Application configuration
    ├── OpenApiConfig.java
    └── MongoConfig.java
```

### Adding a New Feature

#### Example: Adding a Review System

**Step 1: Create Model**

```java
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;
    private String bookingId;
    private String userId;
    private Integer rating;  // 1-5
    private String comment;
    private LocalDateTime createdAt;
    
    // Getters, setters, constructors
}
```

**Step 2: Create Repository**

```java
@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByBookingId(String bookingId);
    List<Review> findByUserId(String userId);
    Double averageRatingByStaffId(String staffId);
}
```

**Step 3: Create Service**

```java
@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    public Review createReview(Review review) {
        review.setCreatedAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }
    
    public List<Review> getReviewsByBooking(String bookingId) {
        return reviewRepository.findByBookingId(bookingId);
    }
}
```

**Step 4: Create Controller**

```java
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review) {
        Review created = reviewService.createReview(review);
        return ResponseEntity.ok(created);
    }
}
```

**Step 5: Add Tests**

```java
@Test
void testCreateReview_Success() {
    Review review = new Review();
    review.setRating(5);
    when(reviewRepository.save(any())).thenReturn(review);
    
    Review result = reviewService.createReview(review);
    
    assertNotNull(result);
    assertEquals(5, result.getRating());
}
```

---

## Frontend Development

### Project Structure

```
frontend/src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── layout/          # Layout components
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── pages/               # Page components
│   ├── auth/
│   ├── booking/
│   ├── shop/
│   └── staff/
├── store/               # Redux store
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── shopSlice.ts
│       └── bookingSlice.ts
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript types
│   └── index.ts
├── utils/               # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
└── App.tsx              # Root component
```

### Adding a New Page

#### Example: Reviews Page

**Step 1: Create Types**

```typescript
// types/index.ts
export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  staffId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
```

**Step 2: Create API Service**

```typescript
// services/api.ts
export const reviewApi = {
  getReviews: (staffId: string): Promise<Review[]> =>
    api.get(`/reviews/staff/${staffId}`).then(res => res.data),
  
  createReview: (review: Partial<Review>): Promise<Review> =>
    api.post('/reviews', review).then(res => res.data),
}
```

**Step 3: Create Redux Slice**

```typescript
// store/slices/reviewSlice.ts
export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async (staffId: string) => {
    return await reviewApi.getReviews(staffId)
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload
    })
  },
})
```

**Step 4: Create Page Component**

```typescript
// pages/review/ReviewsPage.tsx
const ReviewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { reviews } = useSelector((state: RootState) => state.review)
  
  useEffect(() => {
    dispatch(fetchReviews(staffId))
  }, [dispatch, staffId])
  
  return (
    <div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
```

**Step 5: Add Route**

```typescript
// App.tsx
<Route path="/reviews" element={<ReviewsPage />} />
```

---

## Common Development Tasks

### Adding a New API Endpoint

1. Create DTO (if needed)
2. Add method in Service
3. Add endpoint in Controller
4. Add documentation annotation
5. Write tests
6. Update API documentation

### Adding a New Page

1. Create TypeScript types
2. Create API service methods
3. Create Redux slice (if needed)
4. Create page component
5. Add route in App.tsx
6. Add navigation link
7. Write tests

### Debugging Tips

#### Backend Debugging

```java
// Add log statements
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class YourService {
    public void method() {
        log.debug("Processing request for user: {}", userId);
        log.info("Booking created: {}", booking.getId());
        log.error("Error occurred: ", exception);
    }
}
```

#### Frontend Debugging

```typescript
// Use React DevTools
// Install: React Developer Tools Chrome Extension

// Debug Redux state
import { useSelector } from 'react-redux'

function Component() {
  const state = useSelector((state: RootState) => state)
  console.log('Current state:', state)
}

// Network debugging
// Use Browser DevTools → Network tab
```

---

## Code Style Guide

### Backend (Java)

```java
// ✅ Good
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User createUser(UserDto userDto) {
        validateUserDto(userDto);
        User user = mapToEntity(userDto);
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }
    
    private void validateUserDto(UserDto dto) {
        if (dto == null) {
            throw new BadRequestException("User data cannot be null");
        }
    }
}

// ❌ Bad
public class UserService {
    @Autowired UserRepository repo;
    @Autowired PasswordEncoder encoder;
    
    public User create(UserDto dto) {
        return repo.save(new User(dto.getName(), encoder.encode(dto.getPassword())));
    }
}
```

### Frontend (TypeScript/React)

```typescript
// ✅ Good
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = useCallback((data: UserFormData) => {
    onUpdate({ ...user, ...data });
    setIsEditing(false);
  }, [user, onUpdate]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  );
};

// ❌ Bad
export default function UserProfile(props: any) {
  const [editing, setEditing] = useState(false);
  function submit(data: any) {
    props.onUpdate(data);
  }
  return <div>{/* ... */}</div>;
}
```

---

## Performance Best Practices

### Backend

```java
// ✅ Use pagination
Page<Booking> bookings = bookingRepository.findByShopId(
    shopId, 
    PageRequest.of(page, size)
);

// ✅ Use projections
List<Shop> shops = shopRepository.findAll(
    new Document("name", 1).append("address", 1)
);

// ✅ Use caching
@Cacheable("shops")
public Shop getShopById(String id) {
    return shopRepository.findById(id).orElseThrow();
}
```

### Frontend

```typescript
// ✅ Memoize expensive calculations
const sortedBookings = useMemo(() => {
  return bookings.sort((a, b) => a.date - b.date)
}, [bookings])

// ✅ Use React.memo for expensive components
export const BookingList = React.memo(({ bookings }) => {
  return bookings.map(b => <BookingCard key={b.id} booking={b} />)
})

// ✅ Lazy load routes
const ShopsPage = lazy(() => import('./pages/shop/ShopsPage'))
```

---

## Security Guidelines

### Input Validation

```java
// Backend
@NotBlank(message = "Email is required")
@Email(message = "Email must be valid")
private String email;

// Frontend
const { register, errors } = useForm({
  defaultValues: { email: '' },
  resolver: yupResolver(schema)
})
```

### Authentication

```typescript
// Always include token in requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## Common Patterns

### Backend Patterns

#### Service Pattern

```java
@Service
public class EntityService {
    private final EntityRepository repository;
    
    public Entity create(EntityDto dto) {
        validate(dto);
        Entity entity = mapper.toEntity(dto);
        return repository.save(entity);
    }
    
    public Entity findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entity", "id", id));
    }
}
```

#### Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

### Frontend Patterns

#### Custom Hooks

```typescript
function useAuth() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const login = useCallback(async (credentials) => {
    await dispatch(loginAction(credentials))
  }, [dispatch])
  
  return { user, isAuthenticated, login }
}
```

#### Component Composition

```typescript
function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{booking.service.name}</CardTitle>
        <Badge variant={getStatusVariant(booking.status)}>
          {booking.status}
        </Badge>
      </CardHeader>
      <CardContent>
        {/* Details */}
      </CardContent>
    </Card>
  )
}
```

---

## API Development

### Creating a New Endpoint

```java
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Create a review", description = "Customer creates review for completed booking")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Review created"),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Review> createReview(
            @Valid @RequestBody ReviewDto reviewDto) {
        Review review = reviewService.createReview(reviewDto);
        return ResponseEntity.ok(review);
    }
}
```

---

## State Management

### Redux Slice Structure

```typescript
const entitySlice = createSlice({
  name: 'entity',
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})
```

---

## Database Guidelines

### Naming Conventions

```javascript
// Collections: plural, lowercase
users, shops, bookings, payments

// Fields: camelCase
userId, shopId, createdAt

// Indexes: descriptive
email_1, shopId_1_createdAt_-1
```

### Query Performance

```javascript
// ✅ Good: Uses index
db.bookings.find({ shopId: "123", status: "CONFIRMED" })

// ❌ Bad: No index on 'notes'
db.bookings.find({ notes: { $regex: /haircut/ } })

// ✅ Good: Projection
db.bookings.find({}, { _id: 1, status: 1 })

// ❌ Bad: Fetches everything
db.bookings.find({})
```

---

## Useful Commands

### Backend

```bash
# Build without tests
mvn clean package -DskipTests

# Run specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Generate API docs
mvn springdoc-openapi:build

# Check dependencies
mvn dependency:tree

# Update dependencies
mvn versions:display-dependency-updates
```

### Frontend

```bash
# Install new package
npm install package-name

# Update package
npm update package-name

# Remove unused packages
npm prune

# Analyze bundle size
npm run build -- --analyze

# Type check without build
npm run type-check
```

### Database

```javascript
// Check database size
db.stats()

// Analyze query performance
db.bookings.find({shopId: "123"}).explain("executionStats")

// Create backup
mongodump --db barber_ease --out backup/

// Restore from backup
mongorestore --db barber_ease backup/barber_ease/
```

---

## IDE Setup

### IntelliJ IDEA (Backend)

1. Install plugins:
   - Lombok
   - Spring Boot
   - MongoDB

2. Enable annotation processing:
   - Settings → Build → Compiler → Annotation Processors
   - ✅ Enable annotation processing

3. Import code style:
   - Settings → Editor → Code Style → Java
   - Import from `ide/intellij-codestyle.xml`

### VS Code (Frontend)

1. Install extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - Error Lens

2. Settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "typescript.updateImportsOnFileMove.enabled": "always"
   }
   ```

---

## Troubleshooting Development Issues

### Backend Issues

```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Reimport project
mvn idea:idea

# Check for conflicts
mvn dependency:tree
```

### Frontend Issues

```bash
# Clear all caches
rm -rf node_modules .vite dist
npm install

# Fix dependency conflicts
npm install --legacy-peer-deps
```

---

## Resources

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Learning
- [Java Best Practices](https://github.com/in28minutes/java-best-practices)
- [React Patterns](https://reactpatterns.com/)
- [MongoDB University](https://learn.mongodb.com/)

### Tools
- [Postman](https://www.postman.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

## Community

- 💬 [GitHub Discussions](https://github.com/your-repo/discussions)
- 🐦 [Twitter](https://twitter.com/barberease)
- 💼 [LinkedIn](https://linkedin.com/company/barberease)

---

**Happy Coding! 🚀**

*Last Updated: November 2024*

