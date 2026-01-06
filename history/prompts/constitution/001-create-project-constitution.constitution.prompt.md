---
id: 001
title: Create Project Constitution
stage: constitution
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: binyasin
command: /sp.constitution
labels: ["constitution", "governance", "project-setup", "physical-ai", "robotics"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - Constitution validation against project requirements
---

## Prompt

/sp.constituion  You are an expert AI architect, technical author, and spec-driven system designer.

Create a complete, production-ready CONSTITUTION for the project:

Project Name:
Physical AI & Humanoid Robotics — Essentials

Purpose:
Design an AI-Native, short-form, high-quality textbook that teaches the foundations of Physical AI and Humanoid Robotics.
The textbook must be optimized for fast learning, clean presentation, and seamless AI-assisted exploration using a RAG-based chatbot.

The constitution will act as the supreme governing document for:
- Content quality
- Architecture decisions
- UI/UX standards
- AI behavior
- Performance constraints
- Long-term maintainability

--------------------------------------------------
PROJECT VISION
--------------------------------------------------
The project shall deliver a minimalist yet authoritative learning experience that enables beginners and professionals to quickly understand Physical AI and Humanoid Robotics without unnecessary complexity.

The system must combine:
- A modern Docusaurus-based textbook
- A free-tier compatible Retrieval-Augmented Generation (RAG) chatbot
- A clean, distraction-free UI
- Spec-driven, reproducible development

--------------------------------------------------
CONTENT SCOPE & STRUCTURE
----------------------------------------------
All development and content decisions must strictly folln
- Minimal
- Fast-loading
- Mobile-friendly
- Docusaurus-native
- GitHub Pages compatible

Required UI features:
- Textbook-style navigation
- Search-first experience
- Select text → Ask AI interaction
- Optional Urdu language support (non-default)
- Optional personalization (opt-in only)

--------------------------------------------------
ENGINEERING CONSTRAINTS
--------------------------------------------------
- No heavy GPU workloads
- No paid-only dependencies
- No vendor lock-in
- Build must complete on free-tier CI
- All components must be reproducible via specs

--------------------------------------------------
DEPLOYMENT & OPERATIONS
--------------------------------------------------
- Static site hosted on GitHub Pages
- Backend deployable on free-tier cloud services
- Clear separation between frontend, backend, and data
- Environment-variable driven configuration

--------------------------------------------------
SUCCESS CRITERIA
--------------------------------------------------
The project is successful only if:

- The book builds without errors
- The chatbot answers accurately and strictly from text
- UI is clean and intuitive
- Deployment to GitHub Pages is smooth
- System runs fully on free-tier resources

--------------------------------------------------
GOVERNANCE
--------------------------------------------------
This constitution overrides all future design, feature, and implementation decisions.
Any addition or change must explicitly justify alignment with this constitution.
Violations must be rejected.

End the document with a short, authoritative pledge that this project prioritizes clarity, accessibility, and correctness over complexity.

## Response snapshot

Created comprehensive constitution document at `.specify/memory/constitution.md` (503 lines, ~6KB).

**Constitution Structure:**

1. **Preamble** - Supreme governing document establishing project mission and scope

2. **Core Principles (I-X)**:
   - I. Clarity Over Complexity - Max 2000 words/chapter, progressive disclosure, visual aids required
   - II. AI-Native Content Architecture - Markdown-first, semantic structure, RAG optimization, chatbot contract
   - III. Free-Tier Resource Constraints (NON-NEGOTIABLE) - GitHub Pages, free-tier backends, no paid dependencies
   - IV. Minimalist UI/UX Design - Distraction-free, mobile-first, system fonts, WCAG AA
   - V. Spec-Driven, Reproducible Development - SDD workflow, PHR tracking, ADR documentation
   - VI. Content Quality & Accuracy Standards - Technical/pedagogical review, citations required, annual updates
   - VII. Internationalization & Accessibility - Urdu UI support, RTL layout, WCAG 2.1 Level AA
   - VIII. Security & Privacy - No user accounts, no tracking, stateless chatbot, dependency audits
   - IX. Deployment & Operations - Automated CI/CD, GitHub Actions, free-tier monitoring
   - X. Versioning & Change Management - Semantic versioning, changelogs, deprecation policy

3. **Engineering Constraints**:
   - Tech stack: Docusaurus v3.x, TypeScript strict mode, Node LTS
   - RAG backend: Express.js/FastAPI, Pinecone/Supabase/Qdrant, free-tier LLMs
   - Code quality: ESLint, Prettier, Jest/Pytest, 70% backend / 50% frontend coverage
   - Performance: Build <5 min, bundle <300KB, Lighthouse >90, LCP <2.5s

4. **Success Criteria**:
   - 8 measurable success benchmarks
   - 5 failure modes (immediate blockers)

5. **Governance**:
   - Amendment process with ADR requirement
   - Immutable principles: Free-tier, accuracy, spec-driven
   - Enforcement: Pre-commit hooks, PR checklists, periodic audits
   - Conflict resolution with precedence order

6. **Pledge**:
   - Authoritative commitment to clarity, accessibility, correctness
   - Contract with learners worldwide
   - Non-negotiable standard

## Outcome

- ✅ Impact: Established supreme governing document for Physical AI & Humanoid Robotics textbook project with 10 core principles, complete engineering constraints, and governance framework
- 🧪 Tests: Constitution validated against all project requirements (vision, scope, constraints, deployment, success criteria, governance)
- 📁 Files: Created .specify/memory/constitution.md (503 lines), created history/prompts/constitution/ directory
- 🔁 Next prompts: Create initial project structure (Docusaurus setup), create spec for first textbook chapter, setup GitHub Actions CI/CD workflow
- 🧠 Reflection: Constitution successfully balances comprehensive coverage with actionable constraints. Free-tier mandate (Principle III) is enforceable and measurable. AI-native architecture (Principle II) provides clear contract for RAG chatbot behavior. All principles include rejection criteria for enforcement.

## Evaluation notes (flywheel)

- Failure modes observed: None - constitution creation completed successfully with all required sections
- Graders run and results (PASS/FAIL): PASS - Constitution aligns with project vision, enforces free-tier constraints, includes measurable success criteria, provides governance framework
- Prompt variant (if applicable): N/A - First iteration
- Next experiment (smallest change to try): Create initial Docusaurus project structure following constitution mandates, validate bundle size and build time constraints
