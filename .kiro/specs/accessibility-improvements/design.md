# Accessibility Improvements - Design Document

## Architecture Overview

### Component Structure
```
app/
├── layout.tsx (Skip link, ARIA landmarks)
├── page.tsx (Main content wrapper)
components/
├── Hero.tsx (Text contrast fixes)
├── About.tsx (Text contrast fixes)
├── Projects.tsx (Text contrast, tap targets)
├── Skills.tsx (Text contrast)
├── Contact.tsx (Text contrast, form labels)
├── Footer.tsx (Tap targets, ARIA labels)
├── Navigation.tsx (Tap targets, keyboard nav)
├── ProjectModal.tsx (Focus trap, keyboard nav)
├── ThreeDProjectCard.tsx (Tap targets, ARIA labels)
└── SocialSidebar.tsx (Tap targets, ARIA labels)
hooks/
├── useReducedMotion.ts (NEW - Detect motion preference)
├── useFocusTrap.ts (NEW - Modal focus management)
└── useKeyboardNav.ts (NEW - Keyboard navigation helper)
```

## Design Decisions

### 1. Text Contrast Strategy

**Decision**: Replace all low-contrast text colors globally

**Rationale**:
- Consistent approach across all components
- Easy to maintain
- Meets WCAG AA standards
- Better readability for all users

**Implementation**:
```typescript
// Color mapping
zinc-400 (#a1a1aa) → zinc-300 (#d4d4d8)
gray-400 (#9ca3af) → gray-300 (#d1d5db)
zinc-500 (#71717a) → zinc-400 (#a1a1aa) // For less important text

// Contrast ratios
zinc-300 on black: 7.1:1 ✅ (WCAG AA)
gray-300 on black: 7.3:1 ✅ (WCAG AA)
```

### 2. Tap Target Strategy

**Decision**: Use Tailwind utilities for consistent sizing

**Rationale**:
- Declarative approach
- Easy to spot in code
- Responsive by default
- No custom CSS needed

**Implementation**:
```typescript
// Standard tap target
className="p-3 min-w-[44px] min-h-[44px]"

// With responsive sizing
className="p-2 sm:p-3 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"

// Icon buttons
className="p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
```

### 3. Focus Management Strategy

**Decision**: Custom hooks for reusable focus logic

**Rationale**:
- Separation of concerns
- Reusable across components
- Easier to test
- Consistent behavior

**Hook Design**:
```typescript
// useFocusTrap.ts
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const focusableElements = getFocusableElements(containerRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement?.focus();
    
    // Handle Tab key
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

### 4. Reduced Motion Strategy

**Decision**: CSS-first approach with React hook for complex cases

**Rationale**:
- CSS handles most cases automatically
- React hook for conditional rendering
- No performance impact
- Progressive enhancement

**Implementation**:
```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable parallax */
  [style*="transform: translate"] {
    transform: none !important;
  }
}
```

```typescript
// useReducedMotion.ts
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

### 5. Skip Link Strategy

**Decision**: Visually hidden until focused

**Rationale**:
- Standard accessibility pattern
- Doesn't interfere with design
- Keyboard users benefit immediately
- Screen reader friendly

**Implementation**:
```typescript
// app/layout.tsx
<a 
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
>
  Skip to main content
</a>
```

## Component-Specific Designs

### ProjectModal.tsx

**Accessibility Features**:
1. Focus trap when open
2. ESC key to close (already implemented)
3. Return focus to trigger
4. ARIA attributes
5. Prevent body scroll

**Implementation**:
```typescript
export default function ProjectModal({ project, isOpen, onClose }: Props) {
  const modalRef = useFocusTrap(isOpen);
  const triggerRef = useRef<HTMLElement | null>(null);
  
  // Store trigger element
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);
  
  // Return focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            aria-hidden="true"
          />
          
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              ref={modalRef}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-3 min-w-[44px] min-h-[44px] bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 group"
                aria-label="Close project details"
              >
                <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
              </button>
              
              <h2 id="modal-title" className="sr-only">{project.title}</h2>
              <div id="modal-description" className="sr-only">{project.description}</div>
              
              {/* Modal content */}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Navigation.tsx

**Accessibility Features**:
1. Proper ARIA labels
2. Keyboard navigation
3. Focus management
4. Tap target sizing

**Implementation**:
```typescript
<motion.button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="relative z-[5200] flex items-center gap-3 group p-3 min-w-[44px] min-h-[44px] rounded-lg hover:bg-white/10 transition-colors"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={isMenuOpen}
  aria-controls="main-navigation"
>
  {/* Hamburger icon */}
</motion.button>

<nav 
  id="main-navigation"
  aria-label="Main navigation"
  className="..."
>
  {/* Navigation items */}
</nav>
```

### Form Elements (Contact.tsx)

**Accessibility Features**:
1. Proper labels
2. Error messages
3. Required indicators
4. ARIA descriptions

**Implementation**:
```typescript
<div className="space-y-2">
  <label 
    htmlFor="name" 
    className="text-xs font-mono text-zinc-300 uppercase tracking-wider ml-1"
  >
    Name <span className="text-red-400" aria-label="required">*</span>
  </label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
    placeholder="How should I call you?"
    required
    aria-required="true"
    aria-invalid={error ? "true" : "false"}
    aria-describedby={error ? "name-error" : undefined}
  />
  {error && (
    <p id="name-error" className="text-red-400 text-sm" role="alert">
      {error}
    </p>
  )}
</div>
```

## Testing Strategy

### Automated Testing
```bash
# Install testing tools
npm install -D @axe-core/react
npm install -D jest-axe

# Run tests
npm run test:a11y
```

### Manual Testing Checklist
```markdown
## Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+Tab works in reverse
- [ ] Enter/Space activates buttons
- [ ] ESC closes modals
- [ ] Focus visible on all elements
- [ ] No keyboard traps

## Screen Reader
- [ ] All images have alt text
- [ ] Buttons have clear labels
- [ ] Form fields have labels
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Heading hierarchy correct

## Visual
- [ ] Text contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] Tap targets >= 44px
- [ ] Zoom to 200% works
- [ ] No horizontal scroll at 200%

## Motion
- [ ] Reduced motion respected
- [ ] No auto-play animations
- [ ] Parallax disabled when needed
```

## Performance Considerations

### Bundle Size Impact
- New hooks: ~2KB
- CSS additions: ~1KB
- Total impact: ~3KB (minimal)

### Runtime Performance
- Focus trap: O(n) where n = focusable elements
- Reduced motion check: One-time on mount
- No continuous polling
- No performance degradation

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- CSS: Progressive enhancement
- JS: Feature detection
- ARIA: Graceful degradation

## Documentation

### Code Comments
```typescript
/**
 * Traps focus within a container element
 * @param isActive - Whether the focus trap is active
 * @returns Ref to attach to container element
 * 
 * @example
 * const modalRef = useFocusTrap(isOpen);
 * <div ref={modalRef}>...</div>
 */
```

### README Updates
- Add accessibility section
- Document keyboard shortcuts
- List ARIA patterns used
- Link to WCAG guidelines

## Future Enhancements

### Phase 2 (Not in this spec)
- High contrast mode
- Custom focus styles per component
- Keyboard shortcuts documentation
- Accessibility statement page
- WCAG AAA compliance

### Phase 3 (Future)
- Multiple language support
- RTL layout support
- Voice control optimization
- Advanced screen reader features
