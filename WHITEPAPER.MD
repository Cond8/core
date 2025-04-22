# Cond8 Whitepaper

## Abstract

Cond8 is a composable programming model and execution engine for authoring, testing, and deploying dataflow-oriented workflows in TypeScript. It introduces an actor-director architecture where behavior is decomposed into pure, stateless functions ("actors") and orchestrated by composition layers ("directors"). Cond8 emphasizes testability, observability, and compositionality, making it a viable foundation for interpretable, auditable software pipelines. This whitepaper presents the theoretical motivation, system design, and implementation details of Cond8 as a lightweight, pragmatic alternative to traditional imperative programming for workflow logic.

---

## 1. Introduction

Modern software systems increasingly rely on pipelines of side-effectful processes that must be reliable, composable, testable, and observable. These workflows span domains ranging from data processing and ETL to microservice orchestration and AI agent behavior trees.

Existing solutions tend to fall into two camps:

- **Imperative code**: often verbose, brittle, hard to reuse or reason about.
- **Declarative configuration**: e.g., YAML pipelines, which lack expressive power and runtime visibility.

Cond8 seeks a middle ground: it offers **declarative composition** of **typed imperative logic** using a structured, testable abstraction: the actor-director model.

---

## 2. Core Abstractions

### 2.1 Actors

An actor is a stateless (or internally stateful) pure function that operates on a conduit — a proxy for shared state. Actors follow a unified contract and are wrapped using `createRole`, which injects metadata and enables test instrumentation.

```ts
const increment = createRole('name of Actor')(c8 => {
  const current = c8.var('count', 0);
  c8.var('count', current + 1);
});
```

Actors are intended to be single-responsibility, composable, and independently testable.

### 2.2 Directors

Directors orchestrate a sequence of actors into a pipeline, defining input mapping (`.init`) and output projection (`.fin`).

```ts
const director = createDirector('name of Director')(increment, increment)
  .init(input => ({ conduit: input }))
  .fin(readonly => readonly.var('count'));
```

Directors expose `.test()` methods for injecting metadata, validating outputs, and simulating execution.

### 2.3 Recorder

Every execution run is observed by a recorder object, which tracks state transitions, lifecycle events, errors, and metadata. This enables full transparency and auditability.

---

## 3. Motivation and Design Goals

Cond8 is designed for developers who need:

- Compositional units of behavior
- Full testability without external test runners
- Observable execution for debugging, monitoring, or analysis
- Runtime control and instrumentation hooks

It draws inspiration from:

- Redux-style state updates
- Actor models
- Functional composition
- Testing-first software engineering practices

---

## 4. Lifecycle and Hooks

Cond8 introduces a flexible lifecycle system:

- `onEnter`, `onExit`, and `onError` can be implemented via `LifecycleBlueprint` classes
- Events are collected via a `Vacuum` and passed through the recorder

This enables extension points for telemetry, tracing, logging, or behavior modification.

---

## 5. Use Cases

Cond8 has been used in workflows including:

- Business rule evaluation
- Form logic engines
- Agent pipelines with side effects
- Auditable approval flows
- ETL step orchestration

Its test-first design and recorder abstraction make it ideal for systems where correctness and traceability are paramount.

---

## 6. Comparison with Existing Tools

| Feature             | Cond8       | LangChain       | YAML Pipelines | RxJS       |
| ------------------- | ----------- | --------------- | -------------- | ---------- |
| Compositional Units | ✅          | ⚠️ Chained      | ❌ Flat config | ✅         |
| Testable            | ✅          | ⚠️ Manual mocks | ❌             | ✅         |
| Observable          | ✅ Recorder | ❌              | ❌             | ⚠️ Partial |
| Runtime Control     | ✅          | ❌              | ❌             | ⚠️ Complex |
| Typesafe            | ✅          | ⚠️ Partial      | ❌             | ⚠️ Complex |

Cond8 provides a pragmatic balance between declarative clarity and imperative power.

---

## 7. Implementation Details

Cond8 is implemented in TypeScript and published as `@cond8/core`. The core modules include:

- `CoreInfra/`: Actor and director factories
- `CoreDomain/`: Lifecycle and state abstractions
- `Recorder/`: Execution observer and error handler
- `Metadata/`: Test hooks and mock filters

It supports:

- Execution via `.test()` or `.call()`
- Custom recorders and lifecycles
- In-process execution only (no external runtime dependencies)

---

## 8. Roadmap

- Integration with visualization tools (React Flow, Monaco)
- Streaming execution API
- First-class support for Small Language Models (SLMs)
- HTML response recording for LLM-based systems
- AST-first virtual file system

---

## 9. Conclusion

Cond8 offers a testable, composable, observable alternative to imperative glue code and declarative YAML. Its actor-director architecture enables clean separation of concerns and introspectable workflows, making it a strong foundation for building systems where correctness, traceability, and modularity matter.

We invite collaborators, sponsors, and contributors to help refine and extend Cond8 as a new standard for declarative orchestration in TypeScript environments.

---

## License

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
