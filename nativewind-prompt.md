
# Antigravity Prompt — Build the COSTLY Reusable UI System

You are working in an existing React Expo application for COSTLY / WILLMENG Cost Intelligence.

Your task is to implement a reusable, production-minded UI component system based on `design.md`, using NativeWind where it is compatible with the existing Expo setup.

The objective is to establish a centralized design system and reusable component library that can be used repeatedly across all current and future screens of the application.

This is NOT a request to redesign the existing application.

The goal is to extract and standardize the visual language into reusable components while preserving the existing design.

---

# 1. NON-NEGOTIABLE WORKFLOW

Before modifying anything:

1. Inspect the repository thoroughly.
2. Read `design.md` completely.
3. Inspect `package.json`, Expo configuration, app entry points, navigation setup, existing styling files, installed packages, and current screens/components.
4. Determine the current Expo SDK, React Native, Tailwind, and NativeWind versions.
5. Check whether NativeWind is already configured and whether its version is compatible with the current project.
6. Identify existing reusable components and styling conventions before creating new ones.
7. Identify potential compatibility issues before changing configuration.

### Implementation restrictions

- Do not blindly upgrade Expo, React Native, NativeWind, Tailwind, Babel, or Metro.
- Do not replace existing working configurations without a technical reason.
- If NativeWind is already configured, reuse it.
- If NativeWind is missing, configure a compatible version for the existing project.
- Make the smallest necessary configuration changes.
- Verify NativeWind works with a small test component before building the library.
- Preserve existing navigation, routes, authentication, API integrations, and business logic.
- Do not rewrite the entire application.
- Do not replace existing screens with mockups.
- Do not introduce unnecessary dependencies.
- Do not create duplicate components when an existing component already serves the same purpose.
- Do not invent product requirements or business logic.

Before implementation, provide a concise summary of the existing architecture, planned changes, and compatibility risks.

Then proceed with implementation.

---

# 2. DESIGN SYSTEM SOURCE OF TRUTH

Follow `design.md` as the visual source of truth.

The COSTLY design language must remain:

- Professional
- Minimal
- Clean
- Enterprise-oriented
- Data-focused
- Consistent
- Approachable

### Primary design tokens

| Token | Value |
|---|---|
| Navy | #0B1F3A |
| Primary Blue | #246BFF |
| Cyan Accent | #16BFEF |
| Canvas | #F3F6FA |
| Surface | #FFFFFF |
| Primary Text | #102544 |
| Secondary Text | #5F7392 |
| Tertiary Text | #8A9AB0 |
| Border | #E1E9F3 |
| Success | #16885D |
| Warning | #B87512 |
| Error | #C93636 |

These values are initial estimates from the supplied designs.

Do not introduce new colors without a clear functional requirement.

### Visual rules

- Blue is the primary interaction color.
- Navy anchors the brand.
- Cyan is reserved for subtle brand highlights.
- Use white surfaces against pale blue-gray backgrounds.
- Use rounded corners consistently.
- Prefer subtle borders over heavy shadows.
- Maintain generous spacing.
- Avoid excessive icons.
- Avoid unnecessary decorative elements.
- Avoid glassmorphism.
- Avoid gratuitous gradients.
- Avoid decorative orange accent lines.
- Avoid inconsistent typography and arbitrary spacing.

The resulting components must look like they belong to the existing COSTLY application.

---

# 3. CENTRALIZED DESIGN TOKENS

Create or adapt a centralized token system.

The token system must cover:

1. Colors
2. Typography
3. Font weights
4. Font sizes
5. Line heights
6. Spacing
7. Border radii
8. Border widths
9. Shadows/elevation

Suggested structure:

```text
src/
  theme/
    colors.ts
    typography.ts
    spacing.ts
    radii.ts
    shadows.ts
    index.ts
```

Adapt the structure to the existing repository.

### NativeWind integration

Map semantic tokens into the Tailwind/NativeWind configuration supported by the installed version.

Prefer classes such as:

```tsx
className="bg-brand-blue"
className="text-text-primary"
className="border-border-default"
className="rounded-lg"
className="p-5"
```

Avoid repeatedly writing raw hex values across component files.

If a particular token cannot be represented reliably through NativeWind, reference the centralized token directly.

Do not create a second competing theme system.

---

# 4. REUSABLE COMPONENT LIBRARY

Create a focused and extensible component library.

The components must be reusable across multiple screens through props, variants, and composition.

Do not hardcode screen-specific content inside generic components.

## A. Primitive Components

### Button

Create a reusable Button component.

Variants:

- primary
- secondary
- text
- destructive

Sizes:

- sm
- md
- lg

States:

- Default
- Pressed
- Disabled
- Loading
- Focused where applicable

Requirements:

- Consistent height and padding.
- Rounded corners.
- Correct text colors.
- Loading indicator.
- Prevent duplicate submissions during loading.
- Accessible touch target.
- Support custom children only if the API design benefits from it.

Use React Native `Pressable` and `onPress`, not web-only button elements.

Example API:

```tsx
<Button variant="primary" size="lg" onPress={handleContinue}>
  Continue
</Button>
```

### TextField

Create a reusable input component.

Features:

- Label
- Placeholder
- Value
- onChangeText
- Helper text
- Error message
- Disabled state
- Focus state
- Optional leading icon
- Optional trailing accessory
- Secure text entry

Visual requirements:

- White background.
- Cool-gray border.
- Rounded corners.
- Clear focus state.
- Consistent height.
- Proper spacing between label, field, and helper text.

Use React Native `TextInput`.

### Card

Create a reusable Card component.

Support:

- Standard surface
- Optional border
- Optional subtle elevation
- Configurable padding
- Configurable radius
- Composition with children

Example:

```tsx
<Card className="p-5">
  <Text className="text-lg font-semibold text-text-primary">
    Construction Cost
  </Text>
</Card>
```

### IconButton

Features:

- Icon
- Size
- Variant
- Disabled state
- Accessible label
- Pressed state

Maintain minimum practical touch targets.

### Divider

A reusable low-contrast separator.

### Badge

A compact status component.

Support semantic variants where appropriate:

- Default
- Success
- Warning
- Error
- Information

Do not use badges unnecessarily.

### Switch

Use React Native's native Switch where appropriate.

Support:

- Enabled
- Disabled
- Controlled value
- onValueChange

Use the COSTLY blue active track and pale-gray inactive track.

---

## B. Composite Components

### FormField

Combine:

- Label
- Input
- Helper text
- Error message

Avoid duplicating form-field layout across screens.

### PasswordField

Build using the shared TextField.

Include:

- Secure entry
- Show/hide password control
- Appropriate accessibility labels

### SelectableCard

Support:

- Selected state
- Unselected state
- Disabled state
- Optional leading icon
- Title
- Description
- Optional trailing selection indicator

Use a blue border and visible selection indicator when selected.

### PreferenceRow

Support:

- Title
- Description
- Trailing switch or control
- Optional separator

### OnboardingHeader

Support:

- Back button
- Centered COSTLY wordmark
- Optional step information

### ProgressSteps

Create the three-segment progress indicator shown in the onboarding designs.

Support:

- Current step
- Completed steps
- Remaining steps

Use blue for active/completed segments and pale gray for inactive segments.

### BottomActionBar

A reusable bottom action section.

Support:

- Primary CTA
- Optional secondary action
- Safe-area handling
- Consistent horizontal padding

It must never overlap the iOS home indicator or Android navigation area.

---

## C. Feedback Components

Create reusable feedback patterns:

- LoadingState
- EmptyState
- ErrorState
- SuccessState
- SkeletonLoader where useful
- OfflineState where required

These components should be configurable without introducing excessive props.

Do not build components that have no actual use case.

---

# 5. COMPONENT ARCHITECTURE

Adapt the following architecture to the existing repository.

```text
src/
  theme/
    colors.ts
    typography.ts
    spacing.ts
    radii.ts
    shadows.ts
    index.ts

  components/
    ui/
      Button.tsx
      TextField.tsx
      Card.tsx
      IconButton.tsx
      Divider.tsx
      Switch.tsx
      Badge.tsx
      SelectableCard.tsx

    forms/
      FormField.tsx
      PasswordField.tsx

    navigation/
      OnboardingHeader.tsx
      ProgressSteps.tsx
      BottomActionBar.tsx

    feedback/
      LoadingState.tsx
      EmptyState.tsx
      ErrorState.tsx
      SuccessState.tsx

  features/
    auth/
    onboarding/
    markets/
    notifications/
    cost-intelligence/

  showcase/
    ComponentShowcaseScreen.tsx
```

Important:

This is a suggested structure, not a mandatory folder hierarchy.

Inspect the existing project first and preserve its architectural conventions.

---

# 6. COMPONENT API AND CODE QUALITY

All components should:

- Use TypeScript if the project uses TypeScript.
- Have clearly defined props.
- Have sensible default values.
- Support documented variants.
- Use composition for complex layouts.
- Be independent of screen-specific business logic.
- Avoid duplicated styling.
- Avoid unnecessary boolean props.
- Be easy to import and reuse.
- Follow consistent naming conventions.

Prefer:

```tsx
<Button variant="primary" size="lg" />
```

Over components with many unrelated styling props.

Reuse existing class-composition utilities if installed.

Do not automatically install:

- clsx
- tailwind-merge
- class-variance-authority
- Additional UI frameworks

Check the existing dependencies first.

Keep native components compatible with iOS and Android.

Do not use:

- HTML elements
- Browser-only CSS
- DOM APIs
- Web-only dependencies in shared native components

If platform-specific implementations are necessary, isolate them appropriately.

---

# 7. COMPONENT SHOWCASE

This is a particularly important requirement.

Create a dedicated `ComponentShowcaseScreen` using the actual reusable components.

The showcase must act as a visual catalog and development reference for the entire component library.

It should display:

### Buttons
- Primary
- Secondary
- Text
- Destructive
- Small
- Medium
- Large
- Disabled
- Loading

### Inputs
- Empty input
- Filled input
- Focused input
- Error input
- Disabled input
- Password input

### Cards
- Standard card
- Elevated card
- Selectable card
- Selected card
- Disabled card

### Controls
- Switch enabled
- Switch disabled
- Icon buttons
- Badges
- Dividers

### Navigation
- Onboarding header
- Progress indicator
- Bottom action bar

### Feedback
- Loading state
- Empty state
- Error state
- Success state

Requirements:

- Use actual imported shared components.
- Do not hardcode visual replicas inside the showcase.
- Use realistic sample data.
- Maintain the COSTLY visual language.
- Make the showcase scrollable.
- Separate component categories with clear headings.
- Do not connect showcase elements to production APIs.
- Do not change the app's default landing route.
- Use the existing routing conventions if a developer-only route is available.

If adding a route is risky, export the screen and document how to open it manually.

The showcase must make it easy to inspect component variants before using them in production screens.

---

# 8. DOCUMENTATION

Create a component README.

It should explain:

1. Component directory structure.
2. Available components.
3. Import examples.
4. Available variants.
5. Important props.
6. Token usage.
7. How to create a new component.
8. How to access the showcase.
9. NativeWind configuration assumptions.
10. Platform-specific limitations.

Keep `design.md` as the visual specification.

Do not replace it with implementation documentation.

---

# 9. EXISTING SCREEN PRESERVATION

Do not redesign or rewrite existing screens.

The objective is to establish reusable components while maintaining the current visual output.

After creating the library:

1. Identify the existing sign-in screen.
2. Identify the onboarding screens.
3. Identify existing repeated UI patterns.
4. Refactor only the most suitable repeated elements to use the shared components.
5. Preserve spacing, typography, colors, interactions, and navigation.
6. Verify that the refactored screens visually match their previous appearance.

Do not migrate the entire application in one large refactor.

Implement core components first, then migrate one representative screen at a time.

---

# 10. RESPONSIVENESS AND ACCESSIBILITY

The application primarily targets iOS and Android.

Ensure:

- Safe-area handling.
- Keyboard-aware layouts.
- Scrollable forms.
- Responsive card widths.
- Appropriate text scaling.
- Minimum practical touch targets of 44 × 44 dp.
- Screen-reader labels.
- Accessible selected and disabled states.
- Visible focus states on web.
- Appropriate error messaging.
- Platform-compatible shadows and elevations.

Test iOS and Android separately.

If web support is enabled, verify web behavior separately.

Do not assume that a component working on native automatically works on web.

---

# 11. VERIFICATION

After implementation, run the checks available in the repository.

Examples:

- TypeScript checks.
- ESLint.
- Existing tests.
- Expo bundling or platform-specific checks.

Do not claim that a check passed unless it was actually executed.

Inspect for:

- Invalid NativeWind classes.
- Incorrect component imports.
- Broken navigation.
- Missing safe-area handling.
- Inconsistent design tokens.
- Unsupported native styling.
- Incorrect event props.
- Accessibility issues.
- Duplicate components.
- Unnecessary dependencies.

If a check cannot be executed, explain why.

---

# 12. VISUAL ACCEPTANCE CRITERIA

The implementation is successful when:

1. The component library follows the supplied COSTLY design.
2. The original navy, blue, cyan, and pale-gray palette is preserved.
3. All design tokens are centralized.
4. Components can be reused across multiple screens.
5. Components support meaningful variants and states.
6. The showcase demonstrates the actual component library.
7. Existing screens remain functional.
8. No unnecessary UI frameworks or styling systems are introduced.
9. NativeWind works correctly with the current Expo setup.
10. iOS and Android compatibility is verified to the extent possible in the environment.

The final result should feel like a coherent design system, not a collection of unrelated components.

---

# 13. FINAL IMPLEMENTATION REPORT

After completing the work, provide:

1. Summary of the existing architecture you inspected.
2. Expo, React Native, and NativeWind versions.
3. Files created.
4. Files modified.
5. Components implemented.
6. Component variants and available states.
7. How to access the component showcase.
8. How to import and reuse components.
9. Commands and checks actually executed.
10. Remaining issues or compatibility limitations.

Do not claim device testing unless actual device testing occurred.

---

# FINAL INSTRUCTION

Think like a senior frontend engineer building a reusable design system for a production application.

Prioritize:

- Consistency
- Reusability
- Maintainability
- Simplicity
- Accessibility
- Cross-platform compatibility

Do not overengineer.

Do not redesign the product.

Do not break existing functionality.

Build a clean, extensible COSTLY UI component library that can serve as the foundation for every future screen of this application.
