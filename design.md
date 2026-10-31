
# COSTLY — Design System (React Expo + NativeWind)

> **Purpose:** Source of truth for the COSTLY / WILLMENG Cost Intelligence mobile app and any future web target.
>
> **Design source:** Derived from the supplied sign-in, welcome/onboarding, market selection, notification preferences, OS permission prompt, and splash screens. Hex values and font details are visual estimates from screenshots, not extracted source tokens. Verify against the original Figma styles or source code before final polish.

## 1. Product and Visual Direction

COSTLY is a construction-cost intelligence product. The interface should feel **professional, calm, data-led, precise, and approachable**—like a polished financial or enterprise utility rather than a consumer social app.

### Core Principles

1. Clarity before decoration. Use concise headings, direct descriptions, and clear action labels.
2. Blue is the action color. Reserve vivid blue for primary actions, selected states, links, switches, and interactive emphasis.
3. Navy anchors the brand. Use deep navy for the splash/brand background, hero panels, and primary text.
4. Pale cool surfaces reduce visual weight. Use very light blue-gray backgrounds, white cards, and white inputs.
5. One strong primary action per screen. In step-based mobile flows, keep the main action near the bottom while respecting safe areas.
6. Consistent geometry. Rounded cards and controls, thin cool-gray borders, subtle shadows.
7. Data must remain legible. Cost figures, units, timestamps, and status labels need strong contrast and hierarchy.
8. Reusable, not rigid. Components should have documented variants and sizes without props for every tiny difference.
9. Respect native behavior. Use native OS permission prompts and platform-appropriate controls when they improve usability.
10. Accessible states. Selected, disabled, loading, focused, and error states must be distinguishable and accessible.

## 2. React Native / Expo / NativeWind Implementation Decisions

- Target **React Native with Expo** for iOS and Android. Web may be supported, but mobile behavior is the primary design target.
- Use **NativeWind** for Tailwind-style `className` styling only after checking the repository's current Expo SDK, React Native version, and existing styling setup.
- Do not install or upgrade NativeWind, Tailwind, Babel, Metro, Expo, or React Native blindly. Inspect the existing setup first and choose a compatible configuration.
- If NativeWind is already configured, reuse it. If it is not configured, propose and implement the compatible setup for the project's actual versions, then verify it with a small working component before migrating screens.
- Prefer React Native primitives: `View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `FlatList`, `Switch`, and `ActivityIndicator`. Do not use HTML elements such as `div`, `button`, or `input` in native components.
- Use `SafeAreaView` from the project's supported safe-area library (typically `react-native-safe-area-context`) or the project's existing safe-area pattern.
- Use Expo-compatible navigation, icon, font, and animation packages already in the project where possible.
- NativeWind supports Tailwind-like classes, but not every browser CSS property or web component is available in React Native. Do not assume arbitrary web Tailwind plugins, CSS selectors, or browser APIs work on native.
- Keep platform-specific differences isolated with React Native `Platform.select` or `.ios.tsx`, `.android.tsx`, and `.web.tsx` files only where necessary.
- If web is later enabled, test the component on web explicitly; do not claim universal cross-platform support based only on iOS/Android.
- Do not introduce a second styling system unless a clear compatibility requirement demands it.
- Keep domain/business logic out of generic visual components.

## 3. Color System

The values below are **estimated from screenshots**. Use them as initial tokens, then verify against the original design source.

| Token | Initial value | Usage |
|---|---|---|
| `brand.navy` | `#0B1F3A` | Splash screen, dark hero surface, strong brand surfaces |
| `brand.blue` | `#246BFF` | Primary CTA, links, selected cards, switches, active progress |
| `brand.cyan` | `#16BFEF` | Splash tagline and loading indicator; rare highlight |
| `background.canvas` | `#F3F6FA` | Onboarding and standard screen background |
| `surface.default` | `#FFFFFF` | Cards, text inputs, dialogs |
| `surface.subtle` | `#F8FAFD` | Quiet secondary surface |
| `text.primary` | `#102544` | Headings, labels, key figures |
| `text.secondary` | `#5F7392` | Supporting copy, descriptions, metadata |
| `text.tertiary` | `#8A9AB0` | Placeholder text and low-priority metadata |
| `text.inverse` | `#FFFFFF` | Text on navy or blue surfaces |
| `border.default` | `#E1E9F3` | Input borders, separators, card outlines |
| `border.strong` | `#246BFF` | Selected card outline |
| `state.success` | `#16885D` | Positive movement and success feedback |
| `state.warning` | `#B87512` | Warnings |
| `state.error` | `#C93636` | Validation and error feedback |
| `state.disabled` | `#A7B3C4` | Disabled controls and unavailable labels |
| `overlay.scrim` | `rgba(11, 31, 58, 0.42)` | App-owned modal backdrop |

### Color Rules

- Blue is the main interactive color; do not add a competing CTA color.
- Cyan is a brand accent, not a general button color.
- Navy anchors the brand, but most content screens remain light.
- Green is reserved for positive/success information.
- Do not rely on color alone to indicate selected/error/success states.
- Check contrast, particularly secondary text on white and white text on blue. Adjust if needed for WCAG AA.

## 4. Typography

### Font Direction

The screenshots resemble a modern sans-serif such as **Inter or the platform system sans-serif**. The exact family is not confirmed.

- First inspect the project's configured fonts and assets.
- Reuse the existing font if one is already loaded.
- Otherwise use a reliable Expo-compatible font setup, such as `@expo-google-fonts/inter` with `expo-font`, only if compatible with the current Expo SDK.
- Avoid mixing font families without a clear reason.
- On native, typography uses React Native text styles; do not assume browser CSS font loading works identically.

### Type Scale

Values below are design targets in density-independent pixels (dp), not mandatory exact sizes.

| Token | Size | Weight | Typical use |
|---|---:|---:|---|
| `display` | 36 | 600 | Splash wordmark |
| `heading.xl` | 26 | 600–700 | Major page heading |
| `heading.lg` | 23–24 | 600–700 | Screen title |
| `heading.md` | 19–20 | 600 | Card/dialog title |
| `body.lg` | 16 | 400 | Intro and important descriptions |
| `body.md` | 14–15 | 400 | Standard supporting copy |
| `body.sm` | 12–13 | 400 | Helper text and metadata |
| `label` | 13–14 | 500–600 | Form labels |
| `button` | 14–15 | 500–600 | Button labels |
| `metric` | 32–36 | 700 | Key cost number |
| `overline` | 11–12 | 500–600 | Units and compact metadata |

Use paragraph line-height around 1.35–1.5 and heading line-height around 1.15–1.25. In React Native, `lineHeight` is an explicit numeric style value, so define it consistently in tokens/components.

### Wordmark

- Uppercase `COSTLY`, generous tracking (about `0.16em` in the splash treatment).
- White on navy; navy on light backgrounds.
- Tagline `Which Never Costs You` uses cyan on dark surfaces.
- Keep splash tracking separate from regular headings.

## 5. Spacing and Layout

Use a 4 dp base spacing scale.

| Token | Value |
|---|---:|
| `space.1` | 4 |
| `space.2` | 8 |
| `space.3` | 12 |
| `space.4` | 16 |
| `space.5` | 20 |
| `space.6` | 24 |
| `space.8` | 32 |
| `space.10` | 40 |
| `space.12` | 48 |
| `space.16` | 64 |

### Layout Rules

- Start with 20 dp horizontal page insets on phone layouts, adjusting for larger screens.
- Respect status bars, safe areas, and home-indicator areas.
- Bottom actions must sit above the safe-area inset; never hardcode a bottom position that overlaps the home indicator.
- Prefer flexible layout and scroll containers over fixed screenshot coordinates.
- Test small and large phones, keyboard-visible states, and larger system text settings.
- Step-based onboarding uses a predictable header: back action, centered wordmark, optional step count, and three-part progress indicator.
- Do not force every screen into onboarding layout; dashboards, calculators, tables, and settings may use different structures while sharing tokens.

## 6. Shape, Borders, and Elevation

| Token | Value | Usage |
|---|---:|---|
| `radius.xs` | 6 | Compact badges |
| `radius.sm` | 10 | Small controls |
| `radius.md` | 14 | Inputs and buttons |
| `radius.lg` | 18 | Standard cards |
| `radius.xl` | 24 | Hero panels |
| `radius.pill` | 999 | Pills and switches |
| `border.width.default` | 1 | Standard outlines |
| `border.width.selected` | 1–1.5 | Selected card outline |

- Inputs and full-width CTA buttons use rounded corners around 14 dp.
- Standard white cards use 16–20 dp radius.
- Large hero panels may use 24 dp radius.
- Keep elevation subtle. Native shadow implementations differ across platforms; use the existing compatible shadow/elevation convention and verify on iOS and Android.
- Avoid strong borders plus heavy shadows together.
- Use thin, low-contrast separators.

## 7. Iconography and Illustration

- Reuse the icon family already installed; if Lucide is already used, keep it and confirm the React Native-compatible package.
- Typical sizes: 18–20 dp for controls, 20–24 dp for feature rows, 24–28 dp for standalone onboarding symbols.
- Use blue for interactive icons, navy for standard icons, muted gray for inactive icons.
- Do not add icons to every element merely for decoration.
- Splash illustration: fine-line construction skyline/crane drawing in subdued warm gray, anchored near the bottom over navy.
- Avoid unrelated illustrations, emoji, decorative orange accent lines, glassmorphism, and gratuitous gradients.

## 8. Component Specifications

Implement components using React Native primitives and NativeWind classes where supported. Use TypeScript if the project uses TypeScript. Keep generic UI components separate from product features.

### Buttons

Variants:
- `primary`: blue fill, white label.
- `secondary`: white/canvas surface, cool-gray border, navy label.
- `text`: transparent surface, blue label.
- `destructive`: reserved for destructive actions.

Sizes:
- `sm`: around 36–40 dp high.
- `md`: around 44–48 dp high.
- `lg`: around 52 dp high, common for full-width CTA.

States: default, pressed, focused where relevant, disabled, loading. Loading prevents duplicate submissions. Keep labels concise.

### Text Inputs and Form Fields

- White surface, 1 dp border, rounded corners.
- Around 52 dp high by default, while supporting accessible scaling.
- Label above input; helper/error text below.
- Placeholder uses tertiary text.
- Support trailing accessories only when useful, e.g. password visibility toggle.
- Include focused, filled, disabled, error, and secure-entry states.
- Use React Native `TextInput`; ensure labels and errors are exposed accessibly.

### Cards and Selectable Cards

- `Card` handles surface, border, radius, padding, optional elevation.
- `SelectableCard` supports selected/unselected/disabled states and an accessible selected indicator.
- Market row may show a short code, name, availability metadata, and selection control.
- Selected state uses blue outline plus a check/control, not just a subtle background change.
- Locked/unavailable markets must follow approved product rules; do not invent a “request access” workflow.

### Navigation and Progress

- `OnboardingHeader`: back action, centered wordmark, optional step count.
- `ProgressSteps`: three segments for the supplied onboarding flow; active/completed blue, remaining pale gray.
- `BottomActionBar`: safe-area-aware primary CTA and optional secondary action.
- Icon-only buttons need accessible labels and adequate hit areas.

### Toggles and Settings Rows

- Prefer React Native `Switch` unless the existing UI requires a custom switch.
- Active track: blue; inactive track: pale gray; thumb: white.
- `PreferenceRow`: title, supporting sentence, trailing control.
- Grouped rows share separators and align baselines.
- An app preference toggle must not imply that OS permission is already granted.

### Dialogs and Sheets

- Use native OS prompts for notification, location, camera, and other OS permissions.
- App-owned dialogs use a white surface, rounded corners, concise copy, and differentiated actions.
- Use platform-appropriate dismissal, accessibility, and focus behavior.
- Confirm destructive or irreversible actions.

### Status, Badges, and Metadata

- Use compact labels for availability, dates, units, and status.
- Avoid pill badges when plain secondary text is clearer.
- Positive/negative movement requires sign or arrow and text, not color alone.
- Always show units with cost metrics (e.g. `$71/SF`) and explain the period/basis when relevant.

### Data Visualization and Cost Metrics

- Metric cards emphasize one key value, then unit/context, then trend.
- Chart labels, axes, tooltips, and legends must be legible on phones.
- Prioritize accuracy over decoration.
- Distinguish loading, empty, error, unavailable, and stale-data states.
- Never imply that a historical trend exists if source data does not support it.

### Feedback States

Provide reusable patterns for loading/skeleton, empty state, inline validation error, network error/retry, success, disabled/unavailable, and offline/stale data where appropriate.

## 9. Screen Patterns Observed

### Sign-in

Navy brand area above a white rounded content sheet. Heading and short description, social sign-in choices, divider, labeled email/password fields, recovery link, primary CTA, and account-creation path. Support scrolling and keyboard-visible layout.

### Welcome/Onboarding

Light blue-gray canvas, large navy hero panel, heading and short paragraph, feature rows with a single outline icon and concise text, and a primary CTA above the safe area.

### Market Selection

Onboarding header and step progress, clear title and instructions, spacious market rows with code/name/availability and selection state. Availability/access behavior must follow the approved product specification.

### Notification Preferences

Centered icon/title/explanation, grouped preference rows with separators, primary action plus lower-emphasis “Not Now”. Keep app preferences distinct from the OS permission request.

### Splash/Loading

Deep navy background, centered white wordmark, cyan tagline, thin cyan progress indicator, subdued construction skyline line art near the bottom, generous negative space.

## 10. Suggested Architecture

Adapt this to the repository; do not blindly create duplicate folders or competing styling systems.

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
      ProgressSteps.tsx
      Dialog.tsx
      Screen.tsx
      BottomActionBar.tsx
    forms/
      FormField.tsx
      PasswordField.tsx
    navigation/
      OnboardingHeader.tsx
    feedback/
      LoadingState.tsx
      EmptyState.tsx
      ErrorState.tsx
  features/
    auth/
    onboarding/
    markets/
    notifications/
    cost-intelligence/
  showcase/
    ComponentShowcaseScreen.tsx
```

A component should have one responsibility. Keep API/data fetching and business rules in feature layers, not generic primitives.

## 11. NativeWind and Token Rules

- Define semantic tokens once and map them into the project's NativeWind/Tailwind theme configuration where the installed version supports it.
- Use semantic class names such as `bg-brand-blue`, `text-text-primary`, and `border-border-default` where feasible, rather than repeating hex values.
- If a token cannot be represented cleanly in the current NativeWind version, use a centralized theme value or a small inline style; do not duplicate the literal across files.
- Use class composition for documented variants. If the project already has `clsx`, `tailwind-merge`, or a class-variance helper, reuse it. Do not add these automatically without checking the repository.
- Avoid long duplicated class strings; create shared components when the pattern repeats.
- Do not use browser-only CSS, DOM APIs, or web-only dependencies in shared native components.
- Keep platform-specific exceptions minimal and documented.
- Do not migrate every existing screen in one risky rewrite. Implement and verify core components, then refactor one representative screen at a time.

Illustrative usage:

```tsx
<Button variant="primary" size="lg" onPress={handleContinue}>
  Continue
</Button>

<Card className="p-5">
  <Text className="text-lg font-semibold text-text-primary">
    Construction Cost
  </Text>
</Card>
```

These are API examples, not claims that the project's existing Button/Card APIs already match them.

## 12. Quality and Accessibility Rules

- Minimum touch target: aim for 44 × 44 dp where practical.
- Provide feedback for press, selection, loading, disabled, and error states.
- Add accessible labels to icon-only controls.
- Support screen readers and system text scaling.
- Provide visible keyboard focus on web.
- Associate form errors with inputs.
- Aim for WCAG AA contrast for web and follow platform accessibility guidance on native.
- Respect reduced-motion preferences; animations should be subtle and nonessential.
- Check iOS and Android rendering, safe areas, keyboard behavior, and Android elevation.
- Check web explicitly if web is in scope; native support alone does not prove web support.

## 13. Definition of Done

- [ ] Tokens are centralized and referenced by components.
- [ ] NativeWind setup is compatible with the repository's Expo/React Native versions.
- [ ] Core components have documented variants and states.
- [ ] A component showcase demonstrates the reusable library.
- [ ] The existing sign-in/onboarding screens can adopt components without visual regressions.
- [ ] Safe areas, keyboard, accessibility, and small-device behavior are checked.
- [ ] Loading, empty, error, disabled, and selected states exist where needed.
- [ ] No unnecessary dependencies, duplicate styling systems, or unrelated rewrites.
- [ ] Any web target is tested independently.
- [ ] Estimated color/font values are verified against the source design before final production polish.

## Quick Reference

- Primary blue: `#246BFF`
- Navy: `#0B1F3A`
- Cyan accent: `#16BFEF`
- Canvas: `#F3F6FA`
- Surface: `#FFFFFF`
- Primary text: `#102544`
- Secondary text: `#5F7392`
- Border: `#E1E9F3`
- Font direction: Inter-like modern sans-serif; verify actual font.
- Shape language: rounded cards/controls, thin borders, subtle elevation.
- Visual rule: minimal, professional, readable, data-first.
