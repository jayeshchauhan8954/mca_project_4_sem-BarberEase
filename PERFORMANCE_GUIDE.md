# Performance Optimization Guide

## Overview

This guide outlines performance optimization strategies and benchmarks for BarberEase.

---

## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| API Response Time (P95) | < 200ms | ~150ms | ✅ |
| Page Load Time | < 2s | ~1.5s | ✅ |
| Database Query Time | < 50ms | ~30ms | ✅ |
| Time to Interactive | < 3s | ~2.8s | ✅ |
| Lighthouse Score | > 90 | ~85 | 🟡 |

---

## Backend Optimization

### 1. Database Optimization

#### Indexing Strategy

```javascript
// Critical indexes for performance
db.bookings.createIndex({ shopId: 1, appointmentDateTime: 1 })
db.bookings.createIndex({ staffId: 1, appointmentDateTime: 1 })
db.bookings.createIndex({ userId: 1, status: 1 })

// Compound index for common queries
db.bookings.createIndex({ 
  shopId: 1, 
  status: 1, 
  appointmentDateTime: 1 
})
```

#### Query Optimization

```java
// ✅ Good: Uses index and projection
repository.find(
  Query.query(Criteria.where("shopId").is(shopId)),
  new Document("name", 1).append("address", 1)
)

// ❌ Bad: No index, fetches all fields
repository.findAll()
```

#### Connection Pooling

```yaml
spring:
  data:
    mongodb:
      min-pool-size: 10
      max-pool-size: 50
      max-connection-idle-time: 60000
```

### 2. Caching Strategy

#### Add Redis Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

#### Cache Configuration

```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofHours(1))
            .disableCachingNullValues();
        
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}
```

#### Using Cache

```java
@Cacheable(value = "shops", key = "#shopId")
public Shop getShopById(String shopId) {
    return shopRepository.findById(shopId).orElseThrow();
}

@CacheEvict(value = "shops", key = "#shopId")
public Shop updateShop(String shopId, Shop shop) {
    return shopRepository.save(shop);
}
```

### 3. API Response Compression

```yaml
server:
  compression:
    enabled: true
    mime-types: application/json,application/xml,text/html
    min-response-size: 1024
```

### 4. Async Processing

```java
@Async
public CompletableFuture<Void> sendNotification(Booking booking) {
    notificationService.send(booking);
    return CompletableFuture.completedFuture(null);
}
```

### 5. Database Connection Pool Tuning

```yaml
spring:
  data:
    mongodb:
      options:
        max-pool-size: 50
        min-pool-size: 10
        max-connection-idle-time: 60000
        max-connection-life-time: 3600000
```

---

## Frontend Optimization

### 1. Code Splitting

#### Route-based Splitting

```typescript
// Use React.lazy for route components
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))
const ShopsPage = React.lazy(() => import('./pages/shop/ShopsPage'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/shops" element={<ShopsPage />} />
      </Routes>
    </Suspense>
  )
}
```

#### Component-based Splitting

```typescript
const HeavyChart = React.lazy(() => import('./components/HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart data={data} />
    </Suspense>
  )
}
```

### 2. Memoization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexValue(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// Memoize components
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

### 3. Virtual Scrolling

```typescript
import { FixedSizeList } from 'react-window'

function BookingsList({ bookings }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={bookings.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <BookingItem booking={bookings[index]} />
        </div>
      )}
    </FixedSizeList>
  )
}
```

### 4. Image Optimization

```typescript
// Use next-gen formats
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." loading="lazy" />
</picture>

// Lazy load images
<img src="image.jpg" loading="lazy" alt="..." />
```

### 5. Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

### 6. Redux Performance

```typescript
// Use selector memoization
import { createSelector } from '@reduxjs/toolkit'

const selectBookings = (state) => state.booking.bookings
const selectFilter = (state) => state.booking.filter

const selectFilteredBookings = createSelector(
  [selectBookings, selectFilter],
  (bookings, filter) => {
    return bookings.filter(b => b.status === filter)
  }
)
```

---

## Network Optimization

### 1. API Request Batching

```typescript
// Instead of multiple API calls
const shop = await shopApi.getShop(id)
const staff = await shopApi.getStaff(id)
const services = await shopApi.getServices(id)

// Use batch endpoint
const shopData = await shopApi.getShopComplete(id) // Returns all data
```

### 2. Request Debouncing

```typescript
import { debounce } from 'lodash'

const debouncedSearch = useMemo(
  () => debounce((query) => {
    searchShops(query)
  }, 300),
  []
)
```

### 3. Prefetching

```typescript
// Prefetch data on hover
<Link
  to="/shops/123"
  onMouseEnter={() => dispatch(prefetchShop('123'))}
>
  View Shop
</Link>
```

---

## Monitoring Performance

### Backend Metrics

```java
@Timed(value = "api.bookings.create", description = "Time to create booking")
public Booking createBooking(BookingRequest request) {
    // Implementation
}
```

### Frontend Performance Monitoring

```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### Using Lighthouse

```bash
# Run Lighthouse
lighthouse http://localhost:5173 --output html --output-path report.html

# View report
open report.html
```

---

## Performance Checklist

### Before Deploy

- [ ] Run performance tests
- [ ] Check Lighthouse score (> 90)
- [ ] Verify bundle size (< 500KB gzipped)
- [ ] Test with slow 3G network
- [ ] Test with 100+ concurrent users
- [ ] Check database query performance
- [ ] Verify caching is working
- [ ] Test on low-end devices

### Backend Checklist

- [ ] Database indexes created
- [ ] N+1 query problems resolved
- [ ] Connection pooling configured
- [ ] Response compression enabled
- [ ] Async processing for heavy tasks
- [ ] Pagination implemented
- [ ] Rate limiting in place

### Frontend Checklist

- [ ] Code splitting implemented
- [ ] Images optimized and lazy loaded
- [ ] Unused dependencies removed
- [ ] Memoization applied
- [ ] Virtual scrolling for long lists
- [ ] Service worker configured
- [ ] Bundle analyzed and optimized

---

## Benchmarking

### Backend Benchmarks

```bash
# Using Apache Bench
ab -n 1000 -c 100 http://localhost:8080/api/shops

# Using wrk
wrk -t12 -c400 -d30s http://localhost:8080/api/bookings
```

### Expected Results

```
Requests per second: 2000+
Average response time: 50ms
P95 response time: 200ms
P99 response time: 500ms
Error rate: < 0.1%
```

---

## Scalability

### Horizontal Scaling

```yaml
# docker-compose.prod.yml
backend:
  deploy:
    replicas: 3  # Multiple backend instances
    
# Add load balancer
nginx:
  # Nginx will distribute traffic
```

### Database Scaling

```javascript
// MongoDB Replica Set
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
})
```

---

## Resources

- [Spring Boot Performance Tuning](https://spring.io/guides/gs/performance)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [MongoDB Performance Best Practices](https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/)
- [Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: November 2024

