# Contributing to BarberEase

First off, thank you for considering contributing to BarberEase! It's people like you that make BarberEase such a great tool.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [How to Contribute](#how-to-contribute)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Commit Message Guidelines](#commit-message-guidelines)
9. [Issue Reporting](#issue-reporting)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [maintainer@barberease.com].

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- Java 17+ installed
- Node.js 18+ installed
- MongoDB 6+ installed
- Maven 3.8+ installed
- Git installed
- A GitHub account
- Familiarity with Spring Boot and React

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/barber-ease.git
   cd barber-ease
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/barber-ease.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   mvn clean install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your credentials
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   mvn spring-boot:run
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

---

## Development Process

### Branch Strategy

We use Git Flow for branch management:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes
- `release/*` - Release preparation

### Workflow

1. **Create a branch**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Write code
   - Add tests
   - Update documentation

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

---

## How to Contribute

### Types of Contributions

#### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues. When creating a bug report, include:

- **Title**: Clear and descriptive
- **Description**: Detailed explanation
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: OS, browser, versions
- **Additional Context**: Any other relevant information

**Bug Report Template:**
```markdown
## Bug Description
[Clear and concise description]

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Screenshots
[If applicable]

## Environment
- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 96, Firefox 95]
- Version: [e.g. 1.0.0]

## Additional Context
[Any other information]
```

#### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Title**: Clear and descriptive
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Additional Context**: Mockups, examples, etc.

**Enhancement Template:**
```markdown
## Problem Statement
[Describe the problem this enhancement solves]

## Proposed Solution
[Describe your proposed solution]

## Alternative Solutions
[Describe alternatives you've considered]

## Benefits
[Why is this enhancement valuable?]

## Mockups/Examples
[If applicable]
```

#### 📝 Improving Documentation

Documentation improvements are always welcome:

- Fix typos or grammatical errors
- Add missing documentation
- Clarify existing documentation
- Add code examples
- Update outdated information

#### 🎨 Code Contributions

##### Small Changes
- Bug fixes
- Documentation updates
- Small refactors

Just create a PR directly!

##### Large Changes
- New features
- Major refactors
- Breaking changes

Please create an issue first to discuss!

---

## Coding Standards

### Backend (Java/Spring Boot)

#### Code Style
- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use 4 spaces for indentation
- Maximum line length: 120 characters
- Use meaningful variable names

#### Best Practices
```java
// ✅ Good
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User createUser(UserDto userDto) {
        validateUser(userDto);
        User user = mapToEntity(userDto);
        return userRepository.save(user);
    }
}

// ❌ Bad
public class UserService {
    @Autowired
    private UserRepository repo;
    
    public User create(UserDto dto) {
        return repo.save(new User(dto.getName()));
    }
}
```

#### Naming Conventions
- **Classes**: PascalCase (e.g., `UserService`)
- **Methods**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)
- **Variables**: camelCase (e.g., `userName`)

#### Documentation
```java
/**
 * Creates a new user in the system.
 * 
 * @param userDto the user data transfer object
 * @return the created user
 * @throws BadRequestException if user data is invalid
 * @throws ResourceNotFoundException if referenced resources don't exist
 */
public User createUser(UserDto userDto) {
    // Implementation
}
```

### Frontend (React/TypeScript)

#### Code Style
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use 2 spaces for indentation
- Use TypeScript for type safety
- Use functional components with hooks

#### Best Practices
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
    <div className="user-profile">
      {/* Component JSX */}
    </div>
  );
};

// ❌ Bad
export default function UserProfile(props) {
  const [editing, setEditing] = useState(false);
  
  function submit(data) {
    props.onUpdate(data);
  }
  
  return <div>{/* ... */}</div>;
}
```

#### Component Structure
```typescript
// 1. Imports
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

// 2. Types/Interfaces
interface ComponentProps {
  // Props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = (props) => {
  // 4. Hooks
  const dispatch = useDispatch();
  const [state, setState] = useState();
  
  // 5. Callbacks
  const handleClick = useCallback(() => {
    // Implementation
  }, []);
  
  // 6. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`)
- **Files**: PascalCase for components (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

---

## Testing Guidelines

### Backend Testing

#### Unit Tests
```java
@Test
public void testCreateUser_Success() {
    // Arrange
    UserDto userDto = new UserDto("John Doe", "john@example.com");
    User expectedUser = new User("John Doe", "john@example.com");
    when(userRepository.save(any(User.class))).thenReturn(expectedUser);
    
    // Act
    User result = userService.createUser(userDto);
    
    // Assert
    assertNotNull(result);
    assertEquals("John Doe", result.getName());
    verify(userRepository, times(1)).save(any(User.class));
}
```

#### Integration Tests
```java
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    public void testCreateUser_ReturnsCreated() throws Exception {
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"John\",\"email\":\"john@example.com\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John"));
    }
}
```

### Frontend Testing

#### Component Tests
```typescript
describe('UserProfile', () => {
  it('renders user information', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    render(<UserProfile user={user} onUpdate={jest.fn()} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onUpdate when form is submitted', async () => {
    const onUpdate = jest.fn();
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    render(<UserProfile user={user} onUpdate={onUpdate} />);
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.click(screen.getByText('Save'));
    
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Doe' }));
    });
  });
});
```

### Test Coverage Goals
- **Backend**: Minimum 80% code coverage
- **Frontend**: Minimum 70% code coverage
- **Critical paths**: 100% coverage

---

## Pull Request Process

### Before Submitting

1. **Update dependencies**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch
   git merge develop
   ```

2. **Run tests**
   ```bash
   # Backend
   mvn test
   
   # Frontend
   npm test
   ```

3. **Check linting**
   ```bash
   # Frontend
   npm run lint
   ```

4. **Update documentation** if needed

### PR Template

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update

## Related Issue
Fixes #[issue number]

## Changes Made
- [Change 1]
- [Change 2]
- [Change 3]

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: At least 1 approving review required
3. **Testing**: Reviewer tests the changes
4. **Approval**: Maintainer approves and merges

### After Merge

1. Delete your feature branch
2. Pull latest changes from upstream
3. Update your fork

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
# Good
feat(auth): add JWT refresh token functionality
fix(booking): prevent double booking on same slot
docs(readme): update installation instructions
refactor(payment): extract payment validation logic

# Bad
update code
fix bug
changes
```

### Full Example
```
feat(booking): add email notification for confirmations

Implement email notification system that sends confirmation
emails to customers when bookings are created or updated.

- Add NotificationService
- Integrate with SMTP
- Add email templates
- Add notification preferences

Closes #123
```

---

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for solutions
3. **Try the latest version** to see if it's fixed

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information requested
- `wontfix`: This will not be worked on

---

## Development Tips

### Backend Tips

1. **Use DTOs** for API requests/responses
2. **Validate input** at the controller level
3. **Handle exceptions** with GlobalExceptionHandler
4. **Use transactions** for data consistency
5. **Write javadoc** for public methods
6. **Follow REST** principles for APIs

### Frontend Tips

1. **Use TypeScript** for type safety
2. **Split large components** into smaller ones
3. **Use custom hooks** for reusable logic
4. **Memoize expensive** calculations
5. **Handle loading** and error states
6. **Use semantic HTML** for accessibility

---

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Email**: [maintainer@barberease.com]

### Resources

- [Setup Guide](SETUP_GUIDE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Architecture Document](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Annual contributor spotlight

Thank you for contributing to BarberEase! 🎉

