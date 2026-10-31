# costly: Project Context (V1 Delivery)

> **costly**: *which costs you nothing*

This file lists **everything that will be built and delivered in V1**, taken from the Willmeng V1 Blueprint (Revision 2). Use it as the scope checklist: if it is not here, it is not in V1. For folder structure, rules and build order, see `README.md`.

---

## 1. What V1 is

A publicly downloadable, **subscription-based** React Native + Expo app for **iOS and Android**, giving individuals, enterprise users and brokers structured access to **Phoenix** construction-cost and material lead-time intelligence.

- **Platforms:** iOS + Android, one codebase (React Native + Expo + TypeScript)
- **Market:** Phoenix only (database and API stay multi-market ready)
- **Access:** anyone can download, register and browse plans. Paid data is unlocked by server-verified subscription entitlements, not by admin approval
- **Data entry in V1:** controlled seed/import scripts with audit logs (no web CMS yet)
- **Users:** For Individual, For Enterprise, For Broker (UI always says "Enterprise", never "Company")

**Vision question the app answers:** "What published construction cost or lead-time information applies to the Phoenix market, this building size and report period, how has it changed from the prior quarter, and what source and assumptions sit behind it?"

---

## 2. Delivered in V1

### 2.1 Onboarding and accounts
- [ ] Self-service registration (name, work email, password, confirm password)
- [ ] Email / identity verification
- [ ] Sign in, sign out, forgot / reset password (never reveals whether an email is registered)
- [ ] **Account Type Selection:** three separate selectable cards (For Individual, For Enterprise, For Broker), each with icon, title, short description, clear selected state and a Continue button
- [ ] Selected account type persists through onboarding and is saved to the account
- [ ] No manual Willmeng approval required to register
- [ ] Splash / launch screen with session and entitlement bootstrap

### 2.2 Subscription and paywall (full lifecycle)
- [ ] Plan and pricing comparison, filtered by account type (monthly/annual toggle if approved)
- [ ] Free / preview mode clearly separated from paid entitlements
- [ ] Checkout through the approved billing route (Apple IAP / Google Play / web checkout)
- [ ] Purchase **Pending**, **Success** and **Failure** states (access unlocks only after server verification)
- [ ] Premium Feature Locked / **Paywall** screen with View Plans, Restore Purchases and Contact Sales
- [ ] Subscription Status screen: account type, plan, billing status, renewal / paid-through date
- [ ] Manage / Renew and **Restore Purchases**
- [ ] All states handled: none, checkout pending, active, trialing, past due, grace period, cancelled (active until period end), expired, refunded, chargeback
- [ ] Optional **Contact Sales / Request Enterprise Plan** route
- [ ] Expiry or payment failure never deletes the account, account type or saved preferences

### 2.3 Home dashboard
- [ ] Active market indicator showing **Phoenix**
- [ ] Latest published report summary card
- [ ] **Mandatory Quarterly Construction Cost Graph**
- [ ] Quick insight cards
- [ ] Shortcuts to Shell & Site, Tenant Improvements, Lead Times and Calculator
- [ ] Preview state with paywall prompts for unsubscribed users

### 2.4 Mandatory Quarterly Construction Cost Graph
- [ ] Shown on the Home Dashboard and explorable from Cost Data
- [ ] Previous quarter vs current quarter (e.g. Q2 2026 vs Q3 2026), approved Phoenix data only
- [ ] Exact value for each quarter (USD/SF)
- [ ] Signed absolute change (e.g. +$4.50/SF) and signed percentage change (e.g. +6.8%)
- [ ] Labels for market (Phoenix), Quarter/Year, unit, building size / category and source report
- [ ] **Single-quarter fallback:** show the one published value with a message that a comparison cannot yet be made (never plot zero, never invent data)
- [ ] Only compares like with like (same report type, benchmark, definition and unit)
- [ ] Not colour-only: sign, text label and screen-reader announcement ("Increase" / "Decrease")

### 2.5 Cost data explorers (Phoenix)
- [ ] **Cost Data overview:** report period selector, Shell & Site vs TI segmentation, building size filter chips, graph exploration
- [ ] **Shell & Site list:** published size points (e.g. 50,000 to 1,200,000 SF per approved report), hard cost/SF, clear height, duration, signed QoQ change. No interpolation of unpublished sizes
- [ ] **Building Size Detail:** hard cost/SF, clear height (ft), duration (months), signed change, provenance, About This Data section. Unpublished fields show "Unavailable"
- [ ] **Tenant Improvements Explorer:** office rate/SF, HVAC/air-conditioning rate/SF, warehouse lighting rate/SF, source notes, exact source naming and units
- [ ] **Compare Building Sizes:** 2 or 3 published Phoenix sizes side by side, aligned metrics, signed deltas where valid, clear flags for incompatible or unavailable fields

### 2.6 Lead times
- [ ] Overview grouped by category, material and specification
- [ ] Detail view with lead-time value and unit (weeks/months) kept as published, no unapproved conversion
- [ ] Explicit statement that the lead-time clock starts from **submittal approval**

### 2.7 Search and filters
- [ ] Global search across authorized Phoenix data (building size, material, category, keyword)
- [ ] Debounced input, category and period filter chips, live result counts
- [ ] Distinct no-results state with one-tap **Reset Filters**
- [ ] Search query, filters and scroll position preserved when going into a detail screen and back

### 2.8 Manual Report-Based Calculator
- [ ] Phoenix market context shown on the screen
- [ ] User-editable inputs: Reference Area (SF), Reference Cost (USD), Target Area (SF), Trend Adjustment (%), Source Report Reference
- [ ] Inline validation: Reference Area > 0, Target Area > 0, Reference Cost >= 0, clear field-level messages
- [ ] Outputs: Baseline Rate/SF, Applied Adjustment, Adjusted Rate/SF, Indicative Total Cost
- [ ] Visible step-by-step formula breakdown, entered inputs echoed back, assumptions and exclusions
- [ ] Label: *"Indicative calculation based on manually entered published reference data"* plus a non-estimate disclaimer (not a guaranteed price, bid or formal estimate)
- [ ] Editing any input invalidates the previous result
- [ ] Never silently substitutes missing values from another market, quarter, building type or size
- [ ] Calculated figures visually distinct from published report figures

Formula (to be confirmed with Willmeng):
```
Baseline Rate/SF = Reference Cost ÷ Reference Area
Adjusted Rate/SF = Baseline Rate × (1 + Trend Adjustment% ÷ 100)
Indicative Total = Target Area × Adjusted Rate/SF
```
Example: 400,000 SF at $28,400,000, +7.0% trend, target 220,000 SF gives $71.00/SF, $75.97/SF adjusted, $16,713,400 total.

### 2.9 Reports, updates and source documents
- [ ] Updates / Report History list (quarter/year filter, publication date, report type, New / Updated / Published badge)
- [ ] Quarters without approved data are never shown as published
- [ ] Protected **Source Report PDF** viewer / downloader (requires `source_report_access`)
- [ ] **About This Data** panel: report metadata, inclusions, exclusions, methodology, effective date, Willmeng contact
- [ ] Failed PDF request shows an actionable error with report metadata, never a fake or dead link

### 2.10 Profile, settings and support
- [ ] User details, account type badge, Phoenix market indicator
- [ ] Notification preferences (only if backend supports them)
- [ ] Legal / privacy links, Contact Sales route, support contact
- [ ] Sign out clears sensitive cached queries

### 2.11 Shared UI Design System (finished before screens)
- [ ] Colour palette (brand, semantic: active, warning, error, locked) and typography scale with tabular numerals
- [ ] Spacing scale 4/8/12/16/24/32, border widths, radii, elevation, surface hierarchy
- [ ] Buttons (primary, secondary, ghost, destructive), text fields with unit suffixes and inline validation, account type cards, dropdowns / bottom-sheet pickers, removable filter chips
- [ ] Metric cards (value, unit, period badge, signed delta), data rows, 2-3 column comparison tables, the Quarterly Cost Graph component
- [ ] States: default, pressed/focused, selected, disabled, loading (skeleton), empty, validation error, offline/service error, paywall/restricted
- [ ] Central formatters: quarters (Q3 2026), currency, signed percent, areas with separators, lead-time units
- [ ] Touch targets of at least 44x44pt (iOS) / 48x48dp (Android), VoiceOver / TalkBack labels, safe-area handling, keyboard-avoiding forms

### 2.12 State and data-handling behaviour (applies to every data screen)
- [ ] Five visually distinct non-happy states: loading, no approved data, paywall / restricted, offline, backend error
- [ ] Phoenix market and report period persist across views
- [ ] Missing data shows "Unavailable" / "Not published", never 0
- [ ] Increase / decrease shown with colour + sign + label
- [ ] Offline: keep last safe context, timestamped banner, Retry, never present cached data as fresh
- [ ] Published figures and calculator figures clearly separated

---

## 3. Backend delivered in V1

### 3.1 Services
- [ ] Node.js + TypeScript API (Fastify) with authentication, entitlement guard and Phoenix market scope on every protected endpoint
- [ ] Modules: auth/users, organizations, plans, subscriptions, entitlements, billing webhooks, markets, reports, quarterly trends, shell records, TI records, lead times, search, calculator, source documents, import and audit
- [ ] Billing provider adapter (Apple IAP / Google Play / Stripe as approved), server-side receipt/token verification, **idempotent** webhook handling, recovery from delayed or retried webhooks
- [ ] Source PDFs in private object storage with short-lived signed URLs, issued only after entitlement check

### 3.2 API endpoints (`/api/v1`)
| Endpoint | Purpose |
|---|---|
| `POST /auth/register` | Self-service registration with account type |
| `PATCH /me/account-type` | Set account type during onboarding |
| `GET /me` | Profile, account type, subscription summary, entitlements |
| `GET /plans` | Plans filtered by account type |
| `POST /subscriptions/checkout` | Start / verify purchase |
| `POST /subscriptions/restore` | Restore and reconcile purchases |
| `POST /webhooks/billing` | Provider webhooks (signed) |
| `GET /markets` | Active market (Phoenix only in V1) |
| `GET /trends/quarterly-cost` | Previous vs current quarter series with deltas |
| `GET /reports` | Published Phoenix reports |
| `GET /reports/:id/shell-records` | Shell & Site records |
| `GET /reports/:id/ti-records` | Tenant Improvement records |
| `GET /reports/:id/lead-times` | Lead-time records |
| `GET /search?q=` | Search with filters and pagination |
| `POST /calculations/indicative-cost` | Validate inputs and return traceable breakdown |
| `GET /reports/:id/source` | Signed URL for source PDF |

### 3.3 Entitlements (granular, never one boolean)
`cost_data_access`, `lead_time_access`, `leads_access`, `market_access`, `historical_data_access`, `calculator_access`, `export_access`, `source_report_access`

### 3.4 Database (PostgreSQL, day one)
`User`, `Organization`, `OrganizationMembership` (OWNER / ADMIN / MEMBER), `Plan`, `PlanFeature/Entitlement`, `Subscription`, `SubscriptionEvent/WebhookEvent`, `PaymentProviderCustomer`, `Market`, `MarketPermission`, `Report`, `SourceDocument`, `ShellRecord`, `TIRecord`, `LeadTimeRecord`, `AdminAuditLog`

- Unpublished metrics stored as `NULL`, never 0
- Published reports are immutable; corrections create an audited version / import batch
- Organizations and multi-market tables exist now so V2 needs no schema rewrite

### 3.5 Security
- [ ] Server-side authentication and entitlement checks on every protected route and PDF download
- [ ] No raw card data stored, only provider references and normalized status
- [ ] Account and preferences preserved on expiry or cancellation
- [ ] Environment secrets managed outside the repo

### 3.6 Performance targets
- Warm screen transitions feel immediate
- p95 API response under 800 ms for Phoenix list, detail and graph queries
- p95 search under 1 second
- Actionable retry states on network failure

---

## 4. Operational deliverables

- [ ] Defined internal admin roles: publish data, manage plans/prices, troubleshoot subscriptions, apply approved comp access, review audit logs
- [ ] Spreadsheet / CSV / JSON **import template** and **validation script** for Phoenix quarterly reports
- [ ] Step-by-step runbook for staging, validating, approving and publishing a report (until the V2 CMS exists)
- [ ] Separate **Local, Staging/UAT and Production** environments with managed secrets and error monitoring
- [ ] QA results covering the 12 UI/UX criteria and subscription edge cases

### Handover package
- [ ] Source repository, branch / release conventions, environment variable template (no committed secrets)
- [ ] PostgreSQL migrations (Phoenix tables + subscription / organization / entitlement tables)
- [ ] Phoenix import template, validation script, quarterly refresh runbook
- [ ] Billing provider configuration guide, webhook verification runbook, support troubleshooting guide
- [ ] Design System documentation and component inventory
- [ ] QA verification report

---

## 5. NOT in V1 (deferred, do not build)

| Deferred item | Planned for |
|---|---|
| Web Admin Publishing CMS and self-service report authoring | V2 |
| Markets beyond Phoenix (other Arizona areas, Utah, Nevada, Colorado, Texas) and Compare Markets screen | V2 |
| Multi-seat Enterprise / Broker workspaces, seat assignment, custom invoicing automation | V2 |
| Push notification campaigns triggered by publishing | V2 |
| Predictive AI forecasting or automated recommendations | Later |
| Parametric cost assemblies / formal estimating engine | Later |
| Subcontractor / supplier contribution portal, RFQ workflow | Later |
| Executive PDF exports and advanced external sharing | V2+ |
| Multi-building, multi-phase, location-specific project modelling | Later |
| Multi-quarter trend series (beyond 2-quarter comparison), saved scenarios, favourites | V2 |

### V1 is also not
- An invitation-only or admin-gated sign-up system
- A multi-state launch
- A formal estimator, bid generator or guaranteed price
- A predictive platform (the graph shows verified historical figures only)

---

## 6. V1 acceptance criteria (release gates)

### 6.1 UI/UX (12 points)
1. Onboarding shows three separate cards: For Individual, For Enterprise, For Broker
2. Users register and sign in without manual Willmeng approval
3. Phoenix is the only market; Arizona/Utah options and cross-market comparison are removed; Phoenix shown as active context
4. Home Dashboard has the Quarterly Construction Cost Graph (also reachable from Cost Data)
5. Graph shows previous and current quarter values, signed absolute and % change, Quarter/Year, unit and report context when comparable data exists
6. Graph handles a single quarter with an explanation, no invented values, no zero
7. Calculator supports manual entry and editing of reference values and target area within Phoenix
8. Calculator results include Baseline Rate/SF, Applied Adjustment, Adjusted Rate/SF, Indicative Total, visible formula, assumptions/exclusions and disclaimer
9. Plan selection, paywall/locked, payment states (pending, success, failure, past due, grace, expired) and manage/restore flows are in the UI and enforced by the backend
10. Every core screen has distinct loading, empty, validation, offline/service-error and paywall states; failed PDF requests never show a fake link
11. Navigation preserves Phoenix context, report period and search/filter state through drill-down and back
12. Every number is traceable to approved Phoenix data, published vs calculated figures are distinguished, units and periods are exact

### 6.2 Subscription model (8 points)
1. A new user downloads the app and registers without contacting Willmeng
2. An unsubscribed user can sign in, see account type and browse plans
3. A subscribed user gets only the features and Phoenix data in their plan
4. An expired or unpaid subscription cannot call protected APIs or download protected PDFs
5. Successful renewal or restore immediately re-enables entitlements
6. Cancellation follows paid-through and grace rules without deleting account or preferences
7. Individual, Enterprise and Broker types and organization structures exist in the database from day one
8. Subscription and webhook events are auditable, idempotent and recoverable

---

## 7. Open decisions (must be confirmed by Willmeng)

| Decision | Blocks |
|---|---|
| Exact Phoenix geographic boundary and the approved current + previous quarter reports | Data seeding, graph |
| Plan names, monthly/annual prices, free preview vs trial, entitlements per account type | Plans, paywall, checkout |
| Whether broker `leads_access` ships in V1 | Broker plans |
| Enterprise seat / contract rules and when "Contact Sales" appears | Enterprise flow |
| Billing route: Apple IAP + Google Play, external web checkout, or hybrid | Checkout, billing adapter |
| Grace-period policy and duration (or immediate loss of access) | Subscription lifecycle |
| Calculator rounding rules, whether Trend Adjustment is required, allowed % range | Calculator |

---

## 8. Delivery phases

| Phase | Core work | Exit criteria |
|---|---|---|
| 0. Scope, plan and data sign-off | Approve Phoenix definition, Q2/Q3 source reports, plan matrix and prices, billing route, calculator formula | Signed scope, approved datasets, final business rules |
| 1. Design system and wireframes | Tokens, components, 3-card account type, paywall flows, graph, calculator, all states | Design system and all screen states signed off |
| 2. Backend, DB and billing | Schema, billing adapter, webhooks, Phoenix seed/import | Staging API passes entitlement, webhook idempotency and data reconciliation tests |
| 3. Core mobile app and onboarding | Auth, account type, plans, checkout, home, graph, Shell & Site, TI, lead times, search | Onboarding, gating and Phoenix exploration verified on iOS and Android |
| 4. Calculator and size comparison | Calculator, 2-3 size compare, source PDF viewer and error states | Calculator math unit-tested, validation and disclaimers verified in UAT |
| 5. QA, pilot and release | 12-point checklist, subscription edge cases, security review, store submission, handover | All criteria signed off by Willmeng |

---

## 9. Product principles (guide every decision)

1. Information, not a PDF wrapper: PDFs are archival, app data is structured
2. Subscription-first, self-service access
3. Quiet, professional, number-first design
4. Traceable by default: every value ties to market, quarter/year, source report and unit
5. Comparable only when comparable
6. Phoenix-first V1, multi-market architecture
7. Indicative is not an estimate
8. Expand without destabilizing: V2 extends V1 modules, it does not replace them
