# Accessibility Improvements - Requirements

## Overview
Meningkatkan accessibility (a11y) portfolio website untuk memenuhi WCAG 2.1 Level AA standards dan memberikan pengalaman yang lebih baik untuk semua users, termasuk yang menggunakan assistive technologies.

## User Stories

### 1. As a keyboard user
**I want to** navigate the entire website using only keyboard
**So that** I can access all features without using a mouse

**Acceptance Criteria:**
- 1.1 Semua interactive elements dapat di-focus dengan Tab key
- 1.2 Focus indicators visible dan jelas (outline/ring)
- 1.3 Tab order logical dan mengikuti visual flow
- 1.4 Modal dapat di-close dengan ESC key
- 1.5 Focus trapped di dalam modal saat open
- 1.6 Focus kembali ke trigger element saat modal close
- 1.7 Skip to content link tersedia di awal page

### 2. As a screen reader user
**I want to** understand page structure dan content
**So that** I can navigate efficiently dan understand context

**Acceptance Criteria:**
- 2.1 Semua images memiliki descriptive alt text
- 2.2 Buttons dan links memiliki clear labels
- 2.3 ARIA labels ada untuk icon-only buttons
- 2.4 Heading hierarchy correct (h1 → h2 → h3)
- 2.5 Landmark regions defined (main, nav, footer)
- 2.6 Loading states announced
- 2.7 Error messages announced

### 3. As a user with low vision
**I want to** read text easily
**So that** I can understand content without strain

**Acceptance Criteria:**
- 3.1 Text contrast ratio minimal 4.5:1 (WCAG AA)
- 3.2 Large text (18pt+) minimal 3:1 contrast
- 3.3 Interactive elements minimal 44x44px tap target
- 3.4 Text dapat di-zoom hingga 200% tanpa horizontal scroll
- 3.5 Focus indicators memiliki sufficient contrast

### 4. As a user with motion sensitivity
**I want to** reduce or disable animations
**So that** I don't experience discomfort or nausea

**Acceptance Criteria:**
- 4.1 `prefers-reduced-motion` media query respected
- 4.2 Essential animations only saat reduced motion
- 4.3 No auto-playing animations yang tidak bisa di-stop
- 4.4 Parallax effects disabled saat reduced motion

## Technical Requirements

### Color Contrast Fixes
**Current Issues:**
```css
/* FAIL - Contrast ratio < 4.5:1 */
.text-zinc-400 on bg-black → 4.2:1 ❌
.text-gray-400 on bg-black → 4.1:1 ❌
```

**Required Changes:**
```css
/* PASS - Contrast ratio > 4.5:1 */
.text-zinc-300 on bg-black → 7.1:1 ✅
.text-gray-300 on bg-black → 7.3:1 ✅
```

**Files to Update:**
- components/Hero.tsx
- components/About.tsx
- components/Projects.tsx
- components/Skills.tsx
- components/Contact.tsx
- components/Footer.tsx
- components/ProjectModal.tsx
- components/ThreeDProjectCard.tsx

### Tap Target Sizes
**Current Issues:**
```typescript
// TOO SMALL - < 44x44px
<button className="p-2"> // 32px ❌
<a className="p-2"> // 32px ❌
```

**Required Changes:**
```typescript
// CORRECT SIZE - >= 44x44px
<button className="p-3 min-w-[44px] min-h-[44px]"> // 44px ✅
<a className="p-3 min-w-[44px] min-h-[44px]"> // 44px ✅
```

**Files to Update:**
- components/Navigation.tsx (hamburger button)
- components/ProjectModal.tsx (close button)
- components/ThreeDProjectCard.tsx (action buttons)
- components/Footer.tsx (social links, back to top)
- components/SocialSidebar.tsx (social icons)

### Keyboard Navigation
**Required Implementation:**

1. **Focus Trap in Modal**
```typescript
// components/ProjectModal.tsx
- Trap focus inside modal when open
- Cycle through focusable elements
- Return focus to trigger on close
```

2. **Skip to Content Link**
```typescript
// app/layout.tsx
- Add skip link at top of page
- Hidden until focused
- Jump to main content
```

3. **Focus Management**
```typescript
// All interactive components
- Visible focus indicators
- Logical tab order
- No keyboard traps
```

### ARIA Labels
**Required Additions:**

```typescript
// Icon-only buttons
<button aria-label="Close modal">
  <FaTimes />
</button>

<button aria-label="Open menu">
  <HamburgerIcon />
</button>

// Links
<a href="..." aria-label="View project on GitHub">
  <FaGithub />
</a>

// Images
<Image 
  src="..." 
  alt="Weather app dashboard showing temperature and forecast"
/>
```

### Reduced Motion Support
**Required Implementation:**

```typescript
// Global CSS
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// Component level
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
>
```

## Testing Requirements

### Manual Testing
- [ ] Test dengan keyboard only (no mouse)
- [ ] Test dengan screen reader (NVDA/JAWS/VoiceOver)
- [ ] Test dengan browser zoom 200%
- [ ] Test dengan reduced motion enabled
- [ ] Test focus indicators di semua browsers

### Automated Testing
- [ ] Run axe DevTools
- [ ] Run Lighthouse accessibility audit
- [ ] Run WAVE accessibility checker
- [ ] Validate HTML (W3C validator)

### Browser Testing
- [ ] Chrome + ChromeVox
- [ ] Firefox + NVDA
- [ ] Safari + VoiceOver
- [ ] Edge + Narrator

## Success Metrics

### Before (Current State)
- Lighthouse Accessibility Score: ~75
- WCAG Level: Partial A
- Keyboard Navigation: Incomplete
- Screen Reader Support: Basic
- Color Contrast: Some failures

### After (Target State)
- Lighthouse Accessibility Score: 95+
- WCAG Level: AA
- Keyboard Navigation: Full support
- Screen Reader Support: Complete
- Color Contrast: All pass

## Out of Scope
- WCAG AAA compliance (future enhancement)
- Multiple language support (future enhancement)
- Custom screen reader announcements (future enhancement)
- High contrast mode (future enhancement)

## Dependencies
- No new packages required
- Uses existing Framer Motion
- Uses existing Tailwind CSS
- Uses existing React hooks

## Timeline
- **Total Effort**: 10 hours
- **Task 1**: Fix text contrast (2h)
- **Task 2**: Fix tap targets (3h)
- **Task 3**: Add keyboard navigation (4h)
- **Task 4**: Add skip link (1h)

## Notes
- Prioritize keyboard navigation dan contrast fixes
- Test incrementally setelah setiap change
- Document all ARIA patterns used
- Keep performance in mind (no heavy libraries)
