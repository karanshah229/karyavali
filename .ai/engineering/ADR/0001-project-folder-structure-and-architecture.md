# ADR-001: Project Folder Structure and Code Organization

## Status
Accepted

## Date
2026-09-13

## Context
As the project transitions from an initial template into an actively developed mobile application, we need an agreed-upon codebase layout and file organization strategy. Key structural requirements:

- **Feature-Centric Modularity**: Group code by business domain (e.g., `tasks`, `contacts`, `lists`, `auth`, `sharing`) so that screens, components, domain rules, and data access for a capability are colocated rather than scattered across global folders.
- **Thin Routing Layer**: Keep the file-based router directory (`src/app/`) decoupled from feature implementations, treating route files strictly as lightweight navigation shells.
- **Clear Boundary for Shared vs. Feature Code**: Establish unambiguous locations for genuinely reusable UI primitives (`src/components/ui/`), cross-cutting hooks (`src/hooks/`), and domain-agnostic utilities (`src/utils/`) distinct from feature-scoped code.
- **Structured Localization & Testing Assets**: Organize translation files (`src/i18n/locales/`) and test suites (`tests/`, `maestro/`) in standardized hierarchies that scale without polluting feature directories.

## Decision
We adopt a **Feature-Driven (Vertical Slice) Architecture** paired with a **Thin Expo Router Shell**, **First-Class Technical Services**, and **Dedicated Theme & i18n Modules**.

### 1. Target Directory Layout

```text
assets/                                 # Static assets (fonts, images, branding)
scripts/                                # CI/CD and build automation scripts

src/
├── app/                                # Expo Router ONLY (thin routing shell)
│   ├── _layout.tsx                     # Root stack & global provider shell
│   ├── _layout.web.tsx                 # Web-specific routing overrides (if needed)
│   ├── (tabs)/                         # Tab navigation group
│   │   ├── _layout.tsx                 # Tabs layout configuration
│   │   ├── index.tsx                   # Route -> mounts <HomeScreen />
│   │   ├── tasks.tsx                   # Route -> mounts <TaskListScreen />
│   │   └── settings.tsx                # Route -> mounts <SettingsScreen />
│   └── tasks/
│       └── [id].tsx                    # Route -> mounts <TaskDetailsScreen />
│
├── features/                           # Vertical feature slices
│   ├── tasks/
│   │   ├── screens/                    # Feature screen components (flat naming)
│   │   │   ├── task-list-screen.tsx
│   │   │   └── task-details-screen.tsx
│   │   ├── components/                 # Feature-scoped UI components
│   │   │   ├── task-card.tsx
│   │   │   ├── task-card.test.tsx
│   │   │   └── task-header.tsx
│   │   ├── hooks/                      # Feature-specific hooks
│   │   ├── queries/                    # React Query hooks, fetchers & query keys
│   │   ├── store/                      # Feature client UI state store
│   │   ├── data/                       # Feature database queries & repositories
│   │   ├── domain/                     # Pure business logic, rules & types
│   │   │   ├── task.types.ts
│   │   │   └── task-rules.ts
│   │   └── index.ts                    # Feature Public API export
│   │
│   ├── contacts/                       # Contacts & assignees slice
│   ├── lists/                          # Task lists & organization slice
│   ├── auth/                           # Authentication & session slice
│   └── sharing/                        # Collaboration & sharing slice
│
├── components/                         # Design system & shared components
│   └── ui/                             # Generic, domain-agnostic UI primitives
│       ├── button.tsx
│       ├── bottom-sheet.tsx
│       ├── bottom-sheet.web.tsx
│       ├── avatar.tsx
│       ├── themed-text.tsx
│       └── themed-view.tsx
│
├── api/                                # HTTP client, interceptors, error handling & QueryClient
│   ├── client.ts                       # Base fetch/HTTP client
│   ├── errors.ts                       # API error parsing & custom error types
│   ├── interceptors.ts                 # Request/response interceptors (auth, headers)
│   └── query/                          # QueryClient setup & cache configuration
│       ├── query-client.ts
│       ├── persistence.ts
│       └── defaults.ts
│
├── db/                                 # Local database engine & schema management
│   ├── client.ts                       # Database connection / pool
│   ├── schema/                         # Base table definitions
│   ├── migrations/                     # Schema migrations
│   └── seed/                           # Dev seed data
│
├── state/                              # Global client state utilities
│   └── zustand/
│       ├── middleware.ts
│       ├── persist.ts
│       └── helpers.ts
│
├── firebase/                           # Firebase platform services wrapper
│   ├── app.ts
│   ├── auth.ts
│   ├── messaging.ts                    # FCM push notifications
│   ├── analytics.ts
│   └── crashlytics.ts
│
├── observability/                      # Telemetry, logging & monitoring
│   ├── index.ts                        # Unified telemetry facade (track, recordError)
│   ├── newrelic/                       # APM & performance monitoring
│   └── posthog/                        # Product analytics & feature flags
│
├── storage/                            # Fast key-value persistence (MMKV / SecureStore)
├── notifications/                      # Local & scheduled notification handlers
├── sync/                               # Offline synchronization engine
├── background/                         # Background worker registration
├── network/                            # Network connectivity listeners
│
├── i18n/                               # Internationalization from Day 1
│   ├── index.ts                        # i18n initialization
│   ├── config.ts                       # Default language, fallbacks
│   ├── types.ts                        # Type-safe translation keys
│   └── locales/
│       ├── en/                         # English
│       │   ├── common.json
│       │   ├── tasks.json
│       │   └── auth.json
│       └── hi/                         # Hindi
│           ├── common.json
│           ├── tasks.json
│           └── auth.json
│
├── theme/                              # Design tokens & color palettes
│   ├── tokens.ts                       # Combined tokens & contract
│   ├── colors.ts                       # Light / dark color definitions
│   ├── spacing.ts                      # Spacing scale & layout constants
│   └── typography.ts                   # Font families, weights, and type styles
│
├── hooks/                              # Truly global, cross-cutting hooks
│   ├── use-app-state.ts
│   ├── use-network-state.ts
│   └── use-theme.ts
│
├── utils/                              # Pure, domain-agnostic utilities
│   ├── format-date.ts
│   ├── format-date.test.ts
│   └── pluralize.ts
│
├── config/                             # App-wide constants & environment configs
└── types/                              # Global, cross-cutting TypeScript definitions

tests/                                  # Unit, Integration & Component test harness
├── setup/
│   ├── test-setup.ts
│   └── mocks/
├── fixtures/
├── factories/
└── helpers/

maestro/                                # End-to-End (E2E) automated test flows
├── flows/
│   ├── auth/
│   ├── tasks/
│   └── sharing/
├── helpers/
└── config.yaml

app.config.ts                           # Dynamic Expo app configuration
eas.json                                # EAS build & submit profiles
package.json
tsconfig.json
```

### 2. Architectural Boundaries & Rules

1. **Thin Routing Shell (`src/app/`)**: Route files must act purely as entry points (extract route parameters, configure navigation headers, and mount the screen component from `features/*/screens/`). No business logic or queries belong in route files.
2. **Feature Autonomy & Encapsulation**: 
   - Files within `features/<name>/` are private to that feature.
   - Screen files are named flatly (e.g. `task-list-screen.tsx`) rather than `task-list/index.tsx` to prevent editor tab confusion.
   - Domain logic (`domain/`) must be pure TypeScript (no React or UI dependencies).
   - Cross-feature dependencies must exclusively import from the target feature's `index.ts` public interface (e.g., `import { ListPicker } from '@/features/lists'`). Direct deep imports into another feature's internals are forbidden.
3. **Feature Internal Organization**:
   - `screens/`: Screen-level compositions mounted by routes.
   - `components/`: UI components used exclusively within this feature.
   - `hooks/`: Feature-scoped reactive hooks.
   - `queries/`: Asynchronous data-fetching, remote queries, and mutation hooks.
   - `store/`: Client-only ephemeral UI state stores (e.g., active filter selections, modal toggles, draft inputs).
   - `data/`: Feature-specific database queries, local table access, and repositories.
   - `domain/`: Business entities, calculation rules, and type definitions (strictly zero UI or React dependencies).
   - `index.ts`: The public barrel export defining the feature's contract with the rest of the application.
4. **Platform & Technical Service Boundaries (`src/api/`, `src/db/`, `src/firebase/`, etc.)**:
   - `src/api/`: Houses HTTP clients, interceptors, and the global `query/` (QueryClient) setup.
   - `src/db/`: Contains the database connection client, base schemas, and migration runner, while feature-specific data access routines reside in each feature's `data/` folder.
   - `src/firebase/`, `src/observability/`, `src/storage/`: Wrap platform SDKs and expose clean facades so feature components never import raw third-party vendor libraries directly.

---

## Alternatives Considered

### Folder-by-Type (`src/screens/`, `src/components/`, `src/services/`, `src/hooks/`)
- **Pros**: Familiar to beginners; low cognitive overhead for tiny codebases.
- **Cons**: Severe feature fragmentation. Developing a single feature touches 5–7 separate root folders ("shotgun surgery"). High risk of cross-feature spaghetti coupling; deleting or refactoring a feature requires hunting files across the entire codebase.
- **Rejected**: Does not scale beyond an MVP; slows developer velocity and obscures feature domain boundaries.

### Route-Centric Organization / Fat Expo Router (Colocation inside `src/app/`)
- **Pros**: Zero indirection between the file-system route path and the screen code.
- **Cons**: Binds component presentation tightly to Expo Router's navigation engine. Unit and integration testing screens with React Native Testing Library (RNTL) becomes difficult because the entire navigation tree and deep link context must be mocked. Reusing screen compositions across alternate layouts (e.g., modals vs. split-screen web views) becomes clumsy.
- **Rejected**: Keeping `src/app/` thin decouples screen presentation from the routing engine and enables headless screen testing.

### Abstract `src/infrastructure/` Wrapper Directory
- **Pros**: Collapses all technical and platform services into a single folder.
- **Cons**: Adds an unnecessary directory level (`@/infrastructure/api/client`, `@/infrastructure/firebase/auth`), increases import verbosity, and easily devolves into an ambiguous catch-all junk drawer.
- **Rejected**: Promoting concrete technical domains to top-level directories directly under `src/` (`src/api/`, `src/db/`, `src/state/`, `src/firebase/`, `src/observability/`) keeps import paths clean, reduces nesting depth, and reveals the application's technical capabilities immediately.

### Centralized Root State & API Directories (`src/stores/`, `src/services/`, `src/queries/`)
- **Pros**: All application stores and data fetchers live in one central location at the root level.
- **Cons**: Breaks the vertical slice autonomy of features. Feature developers must constantly navigate outside the feature directory to edit state or queries. Makes features difficult to extract, test, or delete independently.
- **Rejected**: Colocating feature-specific stores and queries inside `src/features/<feature>/` preserves vertical slice independence, while keeping only truly global state in `src/state/` or root `src/hooks/`.

### Monolithic Translation Files (`src/locales/en.json`, `src/locales/hi.json`)
- **Pros**: Single file per language; simple file structure.
- **Cons**: Large, unmanageable JSON files with high merge-conflict risk as multiple developers add strings concurrently. Difficult to map translation keys back to feature ownership.
- **Rejected**: Organizing translations by domain namespaces (`locales/en/tasks.json`, `locales/en/auth.json`) matches the feature-driven architecture and keeps translation files maintainable.

---

## Consequences

### Positive
- **High Cohesion**: Everything related to a feature lives in one cohesive directory.
- **Flat & Explicit Technical Imports**: Developers import directly from `@/api/client`, `@/db/client`, `@/firebase/auth`, or `@/observability` without navigating an artificial `infrastructure/` layer.
- **Testability**: Screen components, pure domain logic, and hooks can be tested in isolation without booting the routing engine.
- **Safe Refactoring & Evolution**: Vendor SDKs and local database engines can be swapped or upgraded inside their dedicated folders without touching screen JSX.
- **Clear Architectural Contract**: Eliminates ambiguity for developers and AI agents when adding new capabilities.

### Negative / Trade-offs
- **Initial Indirection**: A route file in `src/app/` requires importing a screen from `src/features/*/screens/`.
- **Top-Level Directory Breadth**: Having `api/`, `db/`, `firebase/`, etc. as siblings under `src/` increases the number of top-level folders under `src/`, requiring team discipline around what qualifies as a top-level technical domain.
