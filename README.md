# @cond8/core

> **Composable, testable, and observable pipelines for TypeScript.**
>
> Build robust flows from small, reusable actors. Inject state, record every step, and assert with confidence.

---

## ✨ What is @cond8/core?

`@cond8/core` is a TypeScript framework for building and testing complex, stateful workflows:

- **Actors**: Pure functions that mutate or observe state.
- **Directors**: Compose actors into pipelines, manage lifecycle, and orchestrate data flow.
- **Lifecycle hooks**: Observe and extend every step, from entry to exit and error.
- **In-memory recording**: Capture all events for debugging, auditing, and test assertions.
- **Test-first**: Easily inject mocks and assertions for both unit and integration testing.

It's ideal for:

- Data processing pipelines
- Business logic engines
- Testable state machines
- Highly-observable, auditable flows

---

## 🚀 Quickstart

```ts
import { createRole, createDirector, CoreMetaHooks } from '@cond8/core';

// Actor: increments a counter in the conduit
const increment = createRole(c8 =>
  c8.var('count', (c8.var('count', 0) ?? 0) + 1),
);

// Director: chains two increments
const pipeline = createDirector('counterDemo')(increment, increment)
  .init(input => ({ conduit: input, recorder: undefined }))
  .fin(readonly => readonly.var('count'));

// Run with test metadata
const result = await pipeline.test(
  CoreMetaHooks.Director.TestInput({}),
  CoreMetaHooks.Director.TestOutput(val => {
    if (val !== 2) throw new Error('Expected 2!');
  }),
);
console.log(result); // 2
```

---

## 🏗️ Architecture

```
+-------------------+         +-------------------+         +-------------------+
|   Actor (Role)    |  --->   |   Actor (Role)    |  --->   |   Actor (Role)    |
+-------------------+         +-------------------+         +-------------------+
        |                           |                           |
        +-----------+---------------+---------------+-----------+
                                    |
                              +-----------+
                              | Director  |
                              +-----------+
                                    |
                           +------------------+
                           |  Recorder/Log    |
                           +------------------+
```

- **Actors**: Stateless/pure or stateful functions, can be tested in isolation.
- **Director**: Orchestrates actors, manages lifecycle, and exposes `.test()`.
- **Recorder**: Captures every event, state diff, and error for inspection.

---

## 💡 Why cond8?

- **Composable**: Build flows by chaining simple, focused actors.
- **Testable**: Inject mocks and assertions directly into the pipeline.
- **Observable**: Every step, error, and state change is recorded.
- **Extensible**: Add custom hooks to observe or modify lifecycle events.

---

## 📦 Installation

```bash
npm install @cond8/core
# or
pnpm add @cond8/core
yarn add @cond8/core
```

---

## 📚 Core Concepts & API

### Actors & Roles

Actors are functions that operate on a conduit (your state object). Use `createRole` to wrap them for metadata and testing:

```ts
const double = createRole(c8 => c8.var('count', (c8.var('count', 0) ?? 0) * 2));
```

### Directors

Directors chain actors, manage lifecycle, and expose a callable API:

```ts
const director = createDirector('mathFlow')(increment, double)
  .init(input => ({ conduit: input, recorder: undefined }))
  .fin(readonly => readonly.var('count'));

const result = await director({ count: 1 }); // 4
```

### Testing & Metadata

Inject test data and assertions using `CoreMetaHooks`:

```ts
await director.test(
  CoreMetaHooks.Director.TestInput({ count: 2 }),
  CoreMetaHooks.Director.TestOutput(val => {
    if (val !== 6) throw new Error('Expected 6!');
  }),
);
```

### Lifecycle Hooks

Observe or extend every step by implementing `LifecycleBlueprint` or using the built-in `FullLifecycleBlueprint`.

---

## 🔍 Example: Custom Lifecycle Hook

```ts
import { FullLifecycleBlueprint } from '@cond8/core';

class LoggingHook extends FullLifecycleBlueprint {
  onEnter(payload) {
    console.log('Entering:', payload);
  }
  onExit(payload) {
    console.log('Exiting:', payload);
  }
}

// Attach to your actor or director via metadata
```

---

## 🛠️ Extending cond8

- **Custom Blueprints**: Extend `CoreBlueprint` or `CoreRedprint` for your own state logic.
- **Metadata Hooks**: Create new `MetaHook` classes for richer test and runtime metadata.
- **Recorder**: Write your own recorder to persist logs, send telemetry, or integrate with external systems.

---

## 📁 Project Structure

```
src/
├─ CoreDomain/    # Blueprints, Redprints, and base services
├─ CoreInfra/     # Actor, role, and director factories
├─ Lifecycle/     # Event hooks and payload collector
├─ Metadata/      # Test metadata and filtering
├─ Recorder/      # Recording, proxying, and error handling
└─ utils/         # Helpers
```

---

## ⚡ Scripts

- `pnpm build` – Compile TypeScript
- `pnpm dev` – Watch & rebuild
- `pnpm lint` – ESLint
- `pnpm format` – Prettier
- `pnpm test` – Vitest

---

## 🤝 Contributing

We welcome issues, suggestions, and PRs! Please open an issue to discuss your idea or bug before submitting major changes.

---

## 📝 License

Apache 2.0 – © cond8 contributors

## Core API

- **createRole**<T extends CoreRedprint>(actorScript: (c8: T) => Promise<T> | T)

  - Returns a factory for `StagedActor` with built-in metadata injection and `.test()`.

- **createDirector**<C8 extends CoreRedprint>(name: string)

  - Builds a `Director` to chain actors:
    1. supply actors via `(...)` or `.appendActors`/`.prependActors`
    2. define an input mapper (`.init`)
    3. define an output mapper (`.fin`)
  - Result is a callable `Executable` with `.test()` and lifecycle recording.

- **ConduitUtils** (on any `c8.utils`):
  - `.var(key, value?)` – get/set per-actor local state
  - `.readonly` – snapshot all blueprint states
  - `.diff()` / `.stringify()` – inspect state changes
  - `.close(...)` – terminate and wrap errors in `C8Error`
  - `.handleEvent(...)` – dispatch lifecycle hooks

## Lifecycle & Hooks

`Vacuum` collects a `LifecyclePayload` object at each step, and `ConduitUtils.handleEvent` calls any active `LifecycleBlueprint` implementations. The default `FullLifecycleBlueprint` simply logs events to the recorder.

## Testing Helpers

Inject test metadata via `CoreMetaHooks`:

- `Actor.TestInput(mockC8)` / `Actor.TestOutput(assertFn)`
- `Director.TestInput(input)` / `Director.TestOutput(assertFn)`

Use these in `.test()` runs to mock inputs or assert outputs without external test runners.

## Scripts

- `pnpm build` – compile TypeScript
- `pnpm dev` – watch & rebuild
- `pnpm lint` – ESLint
- `pnpm format` – Prettier
- `pnpm test` – Vitest

## Project Structure

```
src/
├─ CoreDomain/
│  ├ Blueprints/        // abstract state & lifecycle definitions
│  ├ Redprints/         // CoreRedprint & ConduitUtils
│  └ Services/          // KV service
├─ CoreInfra/
│  ├ create-actor.ts    // actor wrapping + tests
│  ├ create-role.ts     // role factories
│  └ create-director.ts // pipeline orchestration
├─ Lifecycle/
│  ├ LifecycleEventHooks.ts // default hook impls
│  └ Vacuum.ts             // payload collector
├─ Metadata/           // test hooks & filters
├─ Recorder/           // recording, proxy handlers, errors
└─ utils/              // small helpers
```

## Contributing

Contributions welcome! Please open issues or PRs.

## License

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
