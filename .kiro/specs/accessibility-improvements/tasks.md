# Accessibility Improvements - Implementation Tasks

## Task Overview
Total Estimated Time: 10 hours

## Tasks

- [ ] 1. Fix Text Contrast Issues (2 hours)
  - [ ] 1.1 Update Hero component text colors
  - [ ] 1.2 Update About component text colors
  - [ ] 1.3 Update Projects component text colors
  - [ ] 1.4 Update Skills component text colors
  - [ ] 1.5 Update Contact component text colors
  - [ ] 1.6 Update Footer component text colors
  - [ ] 1.7 Update ProjectModal component text colors
  - [ ] 1.8 Update ThreeDProjectCard component text colors
  - [ ] 1.9 Verify all text contrast ratios meet WCAG AA (4.5:1)

- [ ] 2. Fix Tap Target Sizes (3 hours)
  - [ ] 2.1 Fix Navigation hamburger button (44x44px minimum)
  - [ ] 2.2 Fix ProjectModal close button (44x44px minimum)
  - [ ] 2.3 Fix ThreeDProjectCard action buttons (44x44px minimum)
  - [ ] 2.4 Fix Footer social links (44x44px minimum)
  - [ ] 2.5 Fix Footer back to top button (44x44px minimum)
  - [ ] 2.6 Fix SocialSidebar social icons (44x44px minimum)
  - [ ] 2.7 Test all tap targets on mobile devices

- [ ] 3. Add Keyboard Navigation & Focus Management (4 hours)
  - [ ] 3.1 Create useFocusTrap custom hook
  - [ ] 3.2 Create useReducedMotion custom hook
  - [ ] 3.3 Create useKeyboardNav custom hook
  - [ ] 3.4 Implement focus trap in ProjectModal
  - [ ] 3.5 Add focus return to trigger element on modal close
  - [ ] 3.6 Add ARIA labels to Navigation hamburger button
  - [ ] 3.7 Add ARIA labels to ProjectModal close button
  - [ ] 3.8 Add ARIA labels to icon-only buttons in ThreeDProjectCard
  - [ ] 3.9 Add ARIA labels to Footer social links
  - [ ] 3.10 Add ARIA labels to SocialSidebar icons
  - [ ] 3.11 Add proper form labels in Contact component
  - [ ] 3.12 Add ARIA attributes to ProjectModal (role, aria-modal, aria-labelledby)
  - [ ] 3.13 Add ARIA landmark regions (main, nav, footer)
  - [ ] 3.14 Test keyboard navigation (Tab, Shift+Tab, Enter, ESC)

- [ ] 4. Add Skip to Content Link (1 hour)
  - [ ] 4.1 Add skip link in layout.tsx
  - [ ] 4.2 Add main content ID to page wrapper
  - [ ] 4.3 Style skip link (visually hidden until focused)
  - [ ] 4.4 Test skip link functionality with keyboard

- [ ] 5. Add Reduced Motion Support (Included in Task 3)
  - [ ] 5.1 Add reduced motion CSS in globals.css
  - [ ] 5.2 Implement useReducedMotion hook usage in components
  - [ ] 5.3 Test with prefers-reduced-motion enabled

- [ ] 6. Testing & Validation
  - [ ] 6.1 Run Lighthouse accessibility audit (target: 95+)
  - [ ] 6.2 Run axe DevTools scan
  - [ ] 6.3 Test with keyboard only (no mouse)
  - [ ] 6.4 Test with screen reader (NVDA/JAWS/VoiceOver)
  - [ ] 6.5 Test with browser zoom at 200%
  - [ ] 6.6 Test with reduced motion enabled
  - [ ] 6.7 Verify all WCAG 2.1 Level AA criteria met

## Task Details

### Task 1: Fix Text Contrast Issues
**Goal**: Replace all low-contrast text colors to meet WCAG AA standards (4.5:1 ratio)

**Color Mapping**:
- `text-zinc-400` (#a1a1aa) → `text-zinc-300` (#d4d4d8) - 7.1:1 contrast ✅
- `text-gray-400` (#9ca3af) → `text-gray-300` (#d1d5db) - 7.3:1 contrast ✅

**Files to Update**:
1. `components/Hero.tsx` - Bio text
2. `components/About.tsx` - Description text
3. `components/Projects.tsx` - Project descriptions
4. `components/Skills.tsx` - Skill descriptions
5. `components/Contact.tsx` - Form labels and helper text
6. `components/Footer.tsx` - Footer text
7. `components/ProjectModal.tsx` - Modal descriptions
8. `components/ThreeDProjectCard.tsx` - Card descriptions

**Validation**: Use browser DevTools or online contrast checker to verify all text meets 4.5:1 ratio

---

### Task 2: Fix Tap Target Sizes
**Goal**: Ensure all interactive elements are at least 44x44px (Apple & Google guidelines)

**Implementation Pattern**:
```typescript
// Before (too small)
<button className="p-2"> // 32px ❌

// After (correct size)
<button className="p-3 min-w-[44px] min-h-[44px]"> // 44px ✅
```

**Files to Update**:
1. `components/Navigation.tsx` - Hamburger menu button
2. `components/ProjectModal.tsx` - Close button
3. `components/ThreeDProjectCard.tsx` - GitHub/Demo links
4. `components/Footer.tsx` - Social links, back to top button
5. `components/SocialSidebar.tsx` - Social media icons

**Testing**: Use browser DevTools to measure computed dimensions, test on mobile devices

---

### Task 3: Add Keyboard Navigation & Focus Management
**Goal**: Full keyboard accessibility with proper focus management and ARIA labels

#### Subtask 3.1: Create useFocusTrap Hook
**File**: `hooks/useFocusTrap.ts`

**Implementation**:
```typescript
import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus first element
    firstElement?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
  
  return containerRef;
}
```

#### Subtask 3.2: Create useReducedMotion Hook
**File**: `hooks/useReducedMotion.ts`

**Implementation**:
```typescript
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}
```

#### Subtask 3.3: Create useKeyboardNav Hook
**File**: `hooks/useKeyboardNav.ts`

**Implementation**:
```typescript
import { useEffect } from 'react';

export function useKeyboardNav(onEscape?: () => void, onEnter?: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter]);
}
```

#### Subtask 3.4-3.5: Update ProjectModal
**Changes**:
- Import and use `useFocusTrap` hook
- Store trigger element reference
- Return focus to trigger on close
- Add ARIA attributes

#### Subtask 3.6-3.10: Add ARIA Labels
**Pattern**:
```typescript
// Icon-only buttons
<button aria-label="Close modal">
  <FaTimes />
</button>

// Links with icons
<a href="..." aria-label="View project on GitHub">
  <FaGithub />
</a>
```

#### Subtask 3.11: Update Contact Form
**Changes**:
- Add proper `<label>` elements with `htmlFor`
- Add `aria-required` to required fields
- Add `aria-invalid` for error states
- Add `aria-describedby` for error messages
- Add `role="alert"` to error messages

#### Subtask 3.12: Add ARIA to ProjectModal
**Attributes**:
```typescript
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">{project.title}</h2>
  <p id="modal-description">{project.description}</p>
</div>
```

#### Subtask 3.13: Add Landmark Regions
**Updates**:
- Wrap main content in `<main>` tag with ID
- Add `<nav>` with `aria-label="Main navigation"`
- Add `<footer>` with `aria-label="Site footer"`

---

### Task 4: Add Skip to Content Link
**Goal**: Allow keyboard users to skip navigation and jump to main content

**Implementation in layout.tsx**:
```typescript
<body>
  <a 
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
  >
    Skip to main content
  </a>
  <CustomCursor />
  <FloatingRobot />
  <main id="main-content">
    {children}
  </main>
</body>
```

**CSS for sr-only** (should already exist in globals.css):
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

### Task 5: Add Reduced Motion Support
**Goal**: Respect user's motion preferences

**Implementation in globals.css**:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable parallax effects */
  [style*="transform: translate"] {
    transform: none !important;
  }
}
```

**Component Usage** (optional for complex cases):
```typescript
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
>
```

---

### Task 6: Testing & Validation
**Goal**: Verify all accessibility improvements meet WCAG 2.1 Level AA

#### Manual Testing Checklist:
- [ ] Tab through entire site without mouse
- [ ] Shift+Tab works in reverse order
- [ ] Enter/Space activates buttons and links
- [ ] ESC closes modals
- [ ] Focus indicators visible on all elements
- [ ] No keyboard traps
- [ ] Skip link appears on Tab and works
- [ ] All images have alt text
- [ ] All buttons have clear labels
- [ ] Form fields have visible labels
- [ ] Error messages are announced
- [ ] Modal focus is trapped
- [ ] Focus returns to trigger after modal close

#### Automated Testing:
```bash
# Install tools (if needed)
npm install -D @axe-core/react

# Run Lighthouse
# Open DevTools > Lighthouse > Accessibility

# Run axe DevTools
# Install browser extension and run scan
```

#### Browser Testing:
- Chrome + ChromeVox
- Firefox + NVDA (Windows)
- Safari + VoiceOver (Mac)
- Edge + Narrator (Windows)

#### Success Criteria:
- Lighthouse Accessibility Score: 95+
- axe DevTools: 0 violations
- WCAG 2.1 Level AA: All criteria met
- Keyboard navigation: Fully functional
- Screen reader: All content accessible

---

## Notes
- Test incrementally after each task
- Use browser DevTools to verify changes
- Document any issues or edge cases
- Keep performance in mind (no heavy libraries)
- Maintain existing functionality while adding accessibility

## Dependencies
- No new npm packages required
- Uses existing Framer Motion
- Uses existing Tailwind CSS
- Uses existing React hooks

## Success Metrics
**Before**:
- Lighthouse Accessibility: ~75
- WCAG Level: Partial A
- Keyboard Navigation: Incomplete
- Color Contrast: Some failures

**After**:
- Lighthouse Accessibility: 95+
- WCAG Level: AA
- Keyboard Navigation: Full support
- Color Contrast: All pass
