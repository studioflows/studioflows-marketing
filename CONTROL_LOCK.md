# CONTROL_LOCK.md — studioflows-marketing

## Purpose

This file defines repo-level guardrails for `studioflows-marketing`.

All coding agents must read this file before making changes.

## Repo Role

`studioflows-marketing` is the public marketing surface for StudioFlows.

It may contain landing pages, public routes, marketing components, brand visuals, lead-capture surfaces, and related front-end assets.

## Core Rules

- Do not broaden scope.
- Do not perform opportunistic cleanup.
- Do not edit unrelated routes, components, styles, or docs.
- Do not deploy unless the prompt explicitly authorizes deployment.
- Do not mutate production data.
- Do not print secrets, tokens, keys, cookies, connection strings, or environment values.
- Do not edit auth, billing, Stripe, database clients, tenant provisioning, scorecard backend, or sandbox/demo backend unless explicitly allowed by the gate.
- Do not create or change environment files.
- Do not modify lockfiles unless dependency installation is explicitly required and authorized.
- Keep patches minimal and reversible.
- If scope expands, return BLOCKED.

## Marketing Content Rules

- Follow StudioFlows content authenticity standards.
- Do not use generated-sounding business copy.
- Do not use guru phrasing, fake founder arcs, forced contrast formulas, engagement bait, artificial certainty, or over-patterned SaaS language.
- Public copy must be concrete, specific, and founder-facing.

## Proof Requirements

Every gate must return:

- exact files read
- exact files changed
- exact commands run with exit results
- exact route created or modified, if applicable
- what was proven
- what was not proven
- current blocker, if any
- next single action

## Gate States

Use only:

- NOT_STARTED
- CODE_PASS
- DEPLOYED
- RUNTIME_PASS
- BLOCKED
- FROZEN

## Default Behavior

If this file conflicts with a task prompt, stop and return BLOCKED with the exact conflict.
