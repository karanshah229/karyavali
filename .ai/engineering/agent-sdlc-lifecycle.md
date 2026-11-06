# Agent SDLC Lifecycle DAG

## Purpose

An editable, acyclic operating model for Pi-based software delivery. It separates durable knowledge, reusable capability, task execution, and independent evidence so that a change can be traced from request through production learning.

## Collaboration medium

The Git repository is the shared system of record. Markdown artifacts are the durable conversation: a change brief, plan, decisions, evidence, and handoff all live with the code and are versioned together. Pi sessions are the execution surface, not the source of truth.

Suggested layout:

```text
.ai/
  memory/           # Durable, curated facts and decisions
  skills/           # Reusable procedures and tool guidance
  agents/           # Role contracts, prompts, permissions, handoffs
  validators/       # Executable quality gates and evaluation rubrics
  runs/             # Per-change ephemeral run manifests and evidence
  engineering/      # Architecture, lifecycle, and ADRs
```

## Master DAG

```mermaid
flowchart TD
  request[Change request] --> intake[Intake and classification]
  intake --> discovery[Discovery]
  intake --> brief[Change brief and acceptance criteria]
  brief --> design[Architecture and UX design]
  design --> plan[Implementation plan]
  plan --> execute[Specialist-agent execution]
  execute --> integrate[Integration]
  integrate --> verify[Verification]
  verify --> review[Independent review]
  review --> release[Release decision]
  release --> deploy[Deploy]
  deploy --> observe[Observe in production]
  observe --> learn[Curate learnings]

  memory[(Curated memory)] --> discovery
  memory --> design
  memory --> plan
  memory --> execute
  skills[(Skills)] --> discovery
  skills --> execute
  skills --> verify
  agents[(Agent contracts)] --> plan
  agents --> execute
  validators[(Validators)] --> verify
  validators --> review

  discovery --> memoryCandidate[Memory candidate]
  design --> decision[ADR or design decision]
  execute --> evidence[Run evidence]
  verify --> evidence
  review --> evidence
  observe --> productionEvidence[Production evidence]
  memoryCandidate --> learn
  decision --> learn
  evidence --> learn
  productionEvidence --> learn
  learn --> nextChange[Next-change backlog]
```

The arrows only move forward. A failed gate creates a new, linked change request in `next-change backlog`; it never mutates history or creates a hidden feedback loop.

## Flow variants

```mermaid
flowchart LR
  subgraph Feature
    F1[Brief] --> F2[Design] --> F3[Plan] --> F4[Build] --> F5[Validate] --> F6[Release]
  end
  subgraph Defect
    B1[Incident or report] --> B2[Reproduce] --> B3[Root-cause evidence] --> B4[Fix plan] --> B5[Regression proof] --> B6[Release]
  end
  subgraph Exploration
    E1[Question] --> E2[Research] --> E3[Spike] --> E4[Decision] --> E5[Backlog item or discard]
  end
  subgraph Maintenance
    M1[Signal] --> M2[Impact assessment] --> M3[Upgrade or remediation] --> M4[Compatibility proof] --> M5[Release]
  end
```

## Core contracts

| Layer | Owns | Must produce |
| --- | --- | --- |
| Memory | Stable, reusable facts; never raw chat logs | Source, confidence, scope, expiry/review date |
| Skills | Repeatable methods | Inputs, steps, tool access, outputs, failure modes |
| Agents | A bounded role and authority | Goal, allowed writes, handoff schema, stop conditions |
| Validators | Independent claims about quality | Command/rubric, expected evidence, severity, owner |
| Run manifest | One execution of one change | Inputs, agents/skills used, artifacts, gate outcomes |

## Non-negotiable gates

```mermaid
flowchart LR
  A[Scope gate: acceptance criteria are testable] --> B[Plan gate: files, risks, and validation are explicit]
  B --> C[Implementation gate: tests and static checks pass]
  C --> D[Review gate: independent spec and standards review]
  D --> E[Release gate: rollback and observability are ready]
  E --> F[Learning gate: durable insight is curated or explicitly rejected]
```

## Initial operating rules

1. Treat memory as reviewed data, not autonomous agent recollection.
2. Keep agent roles narrow: a planner does not approve its own plan; an implementer does not waive its own failures.
3. Make validators executable where possible; reserve model judgment for explicit rubrics and record its evidence.
4. Give every run an immutable manifest and every release a trace back to its brief and validation evidence.
5. Start with one orchestrator plus planner, implementer, tester, and reviewer roles; split roles only when the handoff cost is justified.

## Decisions to tailor next

- Which tasks may run autonomously, and which need your explicit checkpoint?
- Where does canonical memory live: Markdown, SQLite, a vector index, or a hybrid?
- What risk levels determine validator depth and required human review?
- Which Pi extensions/tools are permitted per role?
- What constitutes release for this app: merge, preview build, store submission, or production telemetry?
