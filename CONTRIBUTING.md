# Contributing to Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrizalbasri/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📋 Code Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode (`strict: true`)
- Add proper type annotations
- Export types from dedicated type files

### Component Guidelines

#### Functional Components Only
```typescript
"use client"; // Add if using hooks/interactivity

import { FC, ReactNode } from 'react';

interface ComponentProps {
  title: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * Component description
 * @param props - Component props
 * @returns Rendered component
 */
const MyComponent: FC<ComponentProps> = ({ title, children, onClick }) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default MyComponent;
```

#### Use Web APIs for State
- React Hooks (useState, useEffect, useCallback, etc.)
- Custom hooks from `/hooks` directory
- Context API for global state

#### Styling
- Use Tailwind CSS for styling
- Use `cn()` utility for conditional classes
- Avoid inline styles except for dynamic values
- Use CSS variables for theme values

### Code Style

#### Naming Conventions
- Components: PascalCase (e.g., `Button.tsx`)
- Functions/Variables: camelCase (e.g., `handleClick`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- Files: Match export name (e.g., export `Navigation` from `Navigation.tsx`)

#### Imports Organization
```typescript
// 1. External dependencies
import { motion } from 'framer-motion';
import Image from 'next/image';

// 2. Internal imports - utilities
import { cn } from '@/lib/utils';

// 3. Internal imports - components
import Button from '@/components/Button';

// 4. Types
import type { Project } from '@/types/project';
```

#### Comments & Documentation
- Use JSDoc for public functions/components
- Add comments for complex logic
- Use TypeScript types instead of comments for obvious things

```typescript
/**
 * Validates email address
 * @param email - Email string to validate
 * @returns true if valid email format
 */
function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
```

## 🔄 Git Workflow

### Branch Naming
```
feature/add-dark-mode          # New feature
fix/contact-form-bug           # Bug fix
refactor/reorganize-components # Code reorganization
docs/add-contributing-guide    # Documentation
test/add-unit-tests           # Tests
```

### Commit Convention (Conventional Commits)
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactor without feature change
- `docs`: Documentation only
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `test`: Adding or updating tests
- `perf`: Performance improvement
- `chore`: Build, dependencies, or other non-code changes

#### Examples
```
feat(auth): add login form validation

fix(contact): prevent form submission on error

refactor: reorganize component structure

docs: add typescript guide to contributing

test: add unit tests for contact form
```

### Pull Request Process

1. **Create a fork** and clone it locally
2. **Create a feature branch** from `main`
3. **Make your changes** with clear commits
4. **Add/update tests** if applicable
5. **Test locally** with `npm run test` and `npm run build`
6. **Push to your fork**
7. **Create a Pull Request** with description

#### PR Title Format
```
[TYPE] Brief description

Examples:
[FEATURE] Add dark mode toggle
[FIX] Fix responsive navigation menu
[REFACTOR] Reorganize component structure
[DOCS] Add TypeScript setup guide
```

#### PR Description Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## How to Test
Steps to test the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript compilation successful
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new console errors/warnings
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage
npm run test -- --coverage
```

### Test Guidelines
- Add tests for new features
- Update tests when modifying existing code
- Aim for >80% code coverage
- Use meaningful test descriptions

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from '@/lib/email';

describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
```

## 📦 Building & Linting

### Lint Code
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Check for Issues
```bash
npm run lint
npm run test:run
npm run build
```

## 📂 Project Structure

```
portofolio/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── sections/       # Page sections
│   ├── common/         # Reusable components
│   ├── features/       # Feature components
│   ├── 3d/            # 3D components
│   └── ui/            # UI primitives
├── constants/          # Configuration constants
├── contexts/           # React contexts
├── data/              # Static data files
├── docs/              # Documentation
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets
├── test/              # Test files
├── types/             # TypeScript type definitions
└── package.json       # Project dependencies
```

## 🎨 Component Organization

Place components in the appropriate directory:

- **sections/**: Full-page sections (Hero, About, Skills, Projects, Contact)
- **common/**: Reusable across pages (Navigation, Footer, Sidebar)
- **features/**: Feature-specific components (CustomCursor, ParticleBackground)
- **3d/**: 3D rendering components (RobotModel, 3DCard)
- **ui/**: Atomic UI components (buttons, cards, modals)

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Describe the bug**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g. Windows]
- Node version: [e.g. 18.0.0]
- Browser: [e.g. Chrome]
```

## 💡 Suggestions & Features

Have an idea? Open a discussion or issue to discuss before implementing.

## ✅ Pre-Commit Checklist

Before submitting a PR, ensure:

- [ ] Code is properly formatted
- [ ] No TypeScript errors
- [ ] Tests pass (`npm run test:run`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors/warnings
- [ ] Updated documentation if needed
- [ ] Commit messages follow convention
- [ ] No hardcoded values (use constants)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Be patient and helpful
- Follow the issue/PR template

---

Thank you for contributing! If you have any questions, feel free to open an issue or discussion.
