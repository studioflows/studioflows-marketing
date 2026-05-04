// FILE: AGENTS.md
// LOCATION: project root (MANDATORY)

// PURPOSE:
// This file defines NON-NEGOTIABLE constraints for Codex.
// Codex MUST follow these rules before executing any task.
// If conflict occurs → AGENTS.md overrides prompt.

// --------------------------------------------------

// CORE PRINCIPLE

- This system is an autonomous operator, NOT a tool
- If output creates UI, dashboards, or passive flows → STOP

// --------------------------------------------------

// HARD CONSTRAINTS (ANTI-DRIFT)

1. NO HALLUCINATION

- DO NOT invent:
  - files
  - database tables
  - APIs
  - environment variables
- If missing context → STOP and request exact input

2. NO ASSUMPTIONS

- Only use:
  - explicitly provided schema
  - known file paths
  - confirmed architecture
- If uncertain → STOP

3. MINIMAL DIFFS ONLY

- Do NOT rewrite entire files unless explicitly told
- Modify smallest possible surface area

4. PURE ARCHITECTURE PROTECTION

- NEVER mix:
  - system (brain)
  - execution (runtime)
  - interface (user layer)
- If coupling is introduced → STOP

5. NO SILENT FALLBACKS

- Always throw explicit errors
- Never "guess" missing values

6. NO PASSIVE SYSTEMS

- Do NOT generate:
  - dashboards
  - analytics-only outputs
  - "review this" flows
- Every output must:
  - trigger OR enable execution

// --------------------------------------------------

// EXECUTION RULES

1. CAPABILITIES

- Must be:
  - pure OR clearly scoped side-effect functions
- Must NOT:
  - trigger execution
  - write to queues (unless explicitly defined task)

2. ACTIONS

- Must:
  - be deterministic
  - be traceable
- Must NOT:
  - depend on undefined state

3. MEMORY

- All outputs must be structured
- No free-text outputs to system layers

// --------------------------------------------------

// CODING RULES

- Use TypeScript only
- Prefer pure functions
- No global mutable state
- Explicit typing required
- No implicit any

// --------------------------------------------------

// VALIDATION LOOP (MANDATORY)

Before completing ANY task, Codex MUST verify:

- Does this introduce hallucination? → FAIL
- Does this assume missing architecture? → FAIL
- Does this reduce system autonomy? → FAIL
- Does this increase cognitive load? → FAIL

If any FAIL → STOP and ask 1 precise question

// --------------------------------------------------

// OUTPUT RULE

- Code must be:
  - atomic
  - testable
  - minimal
- No narrative explanations inside code output

// --------------------------------------------------

// ESCALATION RULE

If task is ambiguous:

- Ask ONE question only
- Do NOT proceed with partial assumptions

// --------------------------------------------------

// PRIORITY STACK

1. System autonomy
2. Execution capability
3. Data integrity
4. Speed

If tradeoff required → follow priority order

// --------------------------------------------------

// FAILURE MODE

If Codex violates ANY rule:

- Output must include:
  ERROR: CONSTRAINT_VIOLATION
  REASON: <rule broken>

// --------------------------------------------------

// END