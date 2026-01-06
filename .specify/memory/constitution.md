<!--
================================================================================
SYNC IMPACT REPORT | Constitution Update
================================================================================
Date: 2026-01-02
Session: sp.constitution command execution

VERSION CHANGE:
  Previous: 1.0.0 (ratified 2025-12-31)
  Current:  1.0.0 (no changes - validation only)
  Bump Rationale: N/A - Existing constitution already production-ready

VALIDATION RESULTS:
  ✅ No placeholder tokens found
  ✅ All 10 Core Principles fully defined
  ✅ Project mission matches user requirements
  ✅ Governance section complete
  ✅ Engineering constraints documented
  ✅ Success criteria defined

MODIFIED PRINCIPLES: None
ADDED SECTIONS: None
REMOVED SECTIONS: None

TEMPLATE CONSISTENCY CHECK:
  ✅ plan-template.md: Constitution Check section references constitution (line 30-34) - ALIGNED
  ✅ spec-template.md: User scenarios focus, no constitutional conflicts - ALIGNED
  ✅ tasks-template.md: User story organization supports constitutional principles - ALIGNED
  ✅ No command files exist: No updates needed

FOLLOW-UP TODOs: None
  - Constitution is production-ready as-is
  - User requirements fully satisfied by existing document
  - No amendments required

CONCLUSION:
The existing constitution (v1.0.0) comprehensively addresses all requirements
specified in the user's input for the Physical AI & Humanoid Robotics textbook
project. No modifications are necessary. This validation confirms compliance
with all constitutional mandates and template alignment.

Suggested Commit Message: N/A (no changes to commit)
================================================================================
-->

# Physical AI & Humanoid Robotics — Essentials | Constitution

## Preamble

This constitution serves as the **supreme governing document** for the Physical AI & Humanoid Robotics — Essentials project. It establishes the immutable principles, constraints, and quality standards that guide all design, development, content, and operational decisions.

**Project Mission**: Design an AI-Native, short-form, high-quality textbook that teaches the foundations of Physical AI and Humanoid Robotics, optimized for fast learning, clean presentation, and seamless AI-assisted exploration using a RAG-based chatbot.

**Scope**: This constitution applies to:
- Content creation and curation
- Architecture and technical design
- UI/UX standards and accessibility
- AI chatbot behavior and accuracy
- Performance and resource constraints
- Deployment and operations
- Long-term maintainability and governance

---

## Core Principles

### I. Clarity Over Complexity

**Mandate**: The textbook and all associated systems must prioritize clarity, simplicity, and comprehension over feature richness or technical sophistication.

**Requirements**:
- Every concept must be explained in the simplest possible terms without sacrificing accuracy
- No unnecessary jargon; technical terms must be defined on first use
- Visual aids (diagrams, illustrations) required for complex concepts
- Progressive disclosure: basics first, advanced topics later
- Maximum chapter length: 2000 words (enforced in content review)
- Each chapter must include:
  - Clear learning objectives (2-5 bullet points)
  - Practical examples or case studies
  - Summary of key takeaways
  - Optional further reading links

**Rejection criteria**:
- Content that requires prerequisite knowledge not covered in earlier chapters
- Explanations that assume domain expertise
- Overly dense paragraphs (max 150 words per paragraph)

---

### II. AI-Native Content Architecture

**Mandate**: All content must be structured to optimize both human reading and AI retrieval. The RAG chatbot must answer accurately and strictly from textbook content.

**Requirements**:
- Markdown-first authoring (Docusaurus-compatible)
- Semantic HTML structure (proper heading hierarchy)
- Metadata in frontmatter:
  ```yaml
  ---
  title: [Chapter Title]
  description: [50-150 char summary]
  keywords: [tag1, tag2, tag3]
  difficulty: [beginner|intermediate|advanced]
  estimated_time: [X minutes]
  ---
  ```
- Each section must be self-contained and contextually complete
- Cross-references must use semantic links (not "click here")
- Code examples must include language tags and inline comments
- Definitions and key concepts must be extractable by RAG system

**AI Chatbot Contract**:
- Answers must cite textbook sections (chapter + heading)
- No hallucination: if answer is not in text, chatbot must say "This topic is not covered in the current edition"
- Responses must match the textbook's tone: educational, precise, accessible
- Support for follow-up questions within same context
- Optional: Urdu language support for queries (English content retrieval)

---

### III. Free-Tier Resource Constraints (NON-NEGOTIABLE)

**Mandate**: The entire system—textbook, chatbot, backend, deployment—must run on **free-tier cloud resources** without exceptions.

**Hard Constraints**:
- **Frontend**: Static site on GitHub Pages (no server-side rendering)
- **Backend**: Deployable on free-tier services (e.g., Vercel, Render, Railway, Fly.io free tier)
- **Database**: Free-tier vector DB (e.g., Pinecone free tier, Supabase pgvector, Qdrant local/cloud free)
- **LLM**: Free-tier API usage (e.g., OpenAI trial credits, Google Gemini free tier, local model via Ollama)
- **CI/CD**: GitHub Actions with free-tier minutes
- **Build time**: Must complete in under 10 minutes on free-tier runners
- **Bundle size**: Frontend JS bundle < 300KB gzipped
- **No paid-only dependencies**: All libraries must have free/open-source options

**Performance Budgets**:
- Page load time: < 2 seconds on 3G connection
- Time to Interactive (TTI): < 3 seconds
- Chatbot response time: < 5 seconds for typical queries
- Maximum memory usage (backend): 512MB
- Maximum concurrent users (chatbot): 100 (with graceful degradation)

**Rejection criteria**:
- Any feature requiring paid services
- Dependencies with vendor lock-in
- GPU-intensive workloads (cloud GPUs are not free-tier)

---

### IV. Minimalist UI/UX Design

**Mandate**: The user interface must be **distraction-free**, **fast-loading**, and **mobile-first**, following textbook-style navigation patterns.

**Design Requirements**:
- **Typography**: System fonts only (no web fonts to reduce load time)
  - Body text: 16px minimum, 1.6 line height
  - Headings: Clear hierarchy (h1: 2.5em, h2: 2em, h3: 1.5em)
- **Color scheme**:
  - Light mode (default): high contrast, accessible (WCAG AA minimum)
  - Dark mode (optional): auto-detect system preference
  - No custom color palettes beyond Docusaurus defaults
- **Navigation**:
  - Persistent sidebar with chapter list (collapsible on mobile)
  - Breadcrumb trail for context
  - Previous/Next chapter buttons
  - Jump-to-section links within chapters
- **Search**:
  - Instant search (Algolia DocSearch or Docusaurus built-in)
  - Keyboard shortcut (Ctrl/Cmd + K)
  - Search results must highlight matching text
- **AI Chatbot Integration**:
  - **Select text → Ask AI**: Highlight any text, right-click or use floating button to query chatbot
  - Chatbot widget: Bottom-right corner, collapsible
  - Chat history: Session-based (not persisted unless user opts in)
- **Responsive Design**:
  - Mobile-first (320px minimum width)
  - Touch-friendly targets (min 44x44px)
  - No horizontal scroll on any device
- **Accessibility**:
  - Semantic HTML (proper landmarks, ARIA labels where needed)
  - Keyboard navigation for all features
  - Screen reader compatible
  - Color contrast ratio ≥ 4.5:1 for text

**Prohibited UI Elements**:
- Pop-ups or modals (except chatbot)
- Auto-playing media
- Unnecessary animations (except loading indicators)
- Third-party ads or trackers
- Social media widgets (unless essential for sharing)

---

### V. Spec-Driven, Reproducible Development

**Mandate**: All features, changes, and content updates must follow the **Spec-Driven Development (SDD)** process. No ad-hoc development.

**Workflow**:
1. **Specification** (`specs/<feature>/spec.md`):
   - Define requirements, scope, constraints
   - User stories or learning objectives
   - Acceptance criteria
2. **Planning** (`specs/<feature>/plan.md`):
   - Architecture decisions
   - Technology choices (with free-tier justification)
   - Data models, API contracts
   - Alternatives considered
3. **Tasks** (`specs/<feature>/tasks.md`):
   - Granular, testable tasks
   - Dependencies and order
   - Acceptance tests for each task
4. **Implementation**:
   - Red-Green-Refactor (TDD where applicable)
   - Commit references to spec/task IDs
5. **Review**:
   - Code review checklist (aligned with constitution)
   - Content review (if textbook chapters modified)
   - Performance validation (bundle size, load time)
6. **Deployment**:
   - Staging deployment for testing
   - Production deployment only after approval

**Prompt History Records (PHR)**:
- Every significant interaction with AI assistant must be recorded in `history/prompts/`
- PHR routing:
  - Constitution changes: `history/prompts/constitution/`
  - Feature work: `history/prompts/<feature-name>/`
  - General: `history/prompts/general/`

**Architecture Decision Records (ADR)**:
- Significant decisions must be documented in `history/adr/`
- Template: `.specify/templates/adr-template.md`
- Trigger: Impact + Alternatives + Scope (see CLAUDE.md guidelines)

---

### VI. Content Quality & Accuracy Standards

**Mandate**: All textbook content must be **technically accurate**, **up-to-date**, and **pedagogically sound**.

**Review Process**:
- **Technical Review**: Subject matter expert validates accuracy
- **Pedagogical Review**: Educational expert validates learning flow
- **Accessibility Review**: Content is understandable to target audience (beginners to professionals)
- **AI Review**: RAG chatbot tested with 10+ queries per chapter

**Content Sources**:
- Primary sources: Research papers, official documentation, standards bodies
- Citations required for all factual claims
- Links to external resources must be stable (prefer DOI, arXiv, official docs over blog posts)

**Update Policy**:
- Annual review cycle for all chapters
- Breaking changes in the field (new standards, deprecated technologies) trigger immediate updates
- Version control for textbook editions (v1.0.0, v1.1.0, etc.)

**Prohibited Content**:
- Speculation presented as fact
- Vendor-specific marketing content
- Uncited claims or statistics
- Offensive, biased, or non-inclusive language

---

### VII. Internationalization & Accessibility

**Mandate**: The textbook must support **optional Urdu language** for UI elements and chatbot queries, while maintaining English as the primary content language.

**Requirements**:
- **UI Localization**:
  - English (default)
  - Urdu (opt-in via language selector)
  - Localized strings for navigation, buttons, labels
  - Right-to-left (RTL) layout support for Urdu
- **Content Language**:
  - Primary textbook content: English only (v1.0)
  - Future: Urdu translations as separate edition (if demand exists)
- **Chatbot Language**:
  - Accept queries in Urdu or English
  - Retrieve from English content
  - Respond in query language
- **Accessibility**:
  - WCAG 2.1 Level AA compliance (minimum)
  - Text resizing up to 200% without layout breakage
  - High-contrast mode option
  - Screen reader tested (NVDA, JAWS, VoiceOver)

---

### VIII. Security & Privacy

**Mandate**: User data privacy is paramount. No unnecessary data collection or tracking.

**Requirements**:
- **No User Accounts** (v1.0):
  - Static site, no login required
  - Optional: Local storage for chat history (user-controlled)
- **Data Collection**:
  - Analytics: Optional, privacy-respecting (Plausible or self-hosted Matomo)
  - No third-party cookies
  - No personal data collection without explicit consent
- **Chatbot Privacy**:
  - Queries not stored on server (stateless API calls)
  - User can clear local chat history
  - No query logs sent to third parties (except LLM API, with user awareness)
- **Dependency Security**:
  - Regular `npm audit` / `yarn audit`
  - Dependabot alerts enabled
  - No dependencies with known critical vulnerabilities

---

### IX. Deployment & Operations

**Mandate**: Deployment must be **automated**, **reproducible**, and **zero-downtime** on free-tier infrastructure.

**Deployment Architecture**:
- **Frontend**:
  - Static site built with Docusaurus
  - Deployed to GitHub Pages via GitHub Actions
  - CDN: Cloudflare (free tier) for global distribution
- **Backend** (RAG Chatbot API):
  - Containerized (Docker) or serverless (Vercel Functions)
  - Deployed to free-tier service (Render, Railway, Fly.io)
  - Environment variables for secrets (API keys, DB credentials)
- **Database** (Vector Store for RAG):
  - Pinecone free tier (100K vectors) or
  - Supabase (free tier with pgvector extension) or
  - Local Qdrant (self-hosted)
- **CI/CD**:
  - GitHub Actions workflows:
    - Build and test on every PR
    - Deploy to staging on merge to `develop`
    - Deploy to production on merge to `main`
  - Build caching to reduce CI time

**Monitoring**:
- Uptime monitoring: UptimeRobot (free tier)
- Error tracking: Sentry (free tier, 5K events/month)
- Performance: Lighthouse CI in GitHub Actions

**Rollback**:
- GitHub Pages: Previous commit can be redeployed
- Backend: Tagged releases, previous version redeployable via Git

---

### X. Versioning & Change Management

**Mandate**: All changes must be versioned, documented, and backwards-compatible where possible.

**Versioning Scheme**:
- **Textbook Content**: `MAJOR.MINOR.PATCH` (Semantic Versioning)
  - MAJOR: Breaking changes (restructured chapters, removed content)
  - MINOR: New chapters, significant additions
  - PATCH: Typo fixes, clarifications, link updates
- **Codebase**: `MAJOR.MINOR.PATCH`
  - MAJOR: Breaking API changes (chatbot endpoints)
  - MINOR: New features (e.g., Urdu support, new search)
  - PATCH: Bug fixes, performance improvements

**Change Log**:
- `CHANGELOG.md` at repository root
- Format: Keep a Changelog (https://keepachangelog.com/)
- Each release must include:
  - Version number and date
  - Added, Changed, Deprecated, Removed, Fixed, Security sections

**Deprecation Policy**:
- Features marked deprecated for at least one MINOR version before removal
- Clear migration path documented
- User-facing deprecation warnings (if applicable)

---

## Engineering Constraints

### Technology Stack

**Mandatory**:
- **Frontend**: Docusaurus (v3.x, React-based)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules or Tailwind CSS (minimal usage)
- **Package Manager**: npm or yarn (lockfile required)
- **Node Version**: LTS (18.x or 20.x)

**Backend** (RAG Chatbot):
- **Framework**: Express.js (Node.js) or FastAPI (Python) or Next.js API routes
- **Vector DB**: Pinecone / Supabase pgvector / Qdrant
- **Embedding Model**: OpenAI `text-embedding-3-small` or free alternative (Sentence Transformers)
- **LLM**: OpenAI GPT-3.5-turbo (free trial/credits) or Google Gemini (free tier) or local Llama 3 (via Ollama)

**Prohibited**:
- Client-side rendering frameworks other than Docusaurus (no Next.js, Gatsby, etc. unless justified in ADR)
- Heavy UI libraries (Material-UI, Ant Design) — stick to Docusaurus defaults
- Paid-only services or APIs

---

### Code Quality Standards

**Linting & Formatting**:
- ESLint (Airbnb or Standard config)
- Prettier (enforced via pre-commit hook)
- Markdown linting (markdownlint)

**Testing**:
- Unit tests: Jest (frontend), pytest (backend if Python)
- Integration tests: API endpoints, RAG retrieval accuracy
- E2E tests: Playwright (optional, for critical user flows)
- Coverage target: 70% minimum for backend, 50% for frontend

**Git Workflow**:
- Branch naming: `feature/<name>`, `fix/<name>`, `docs/<name>`
- Commit messages: Conventional Commits (feat, fix, docs, chore, etc.)
- Pull requests required for `main` and `develop` branches
- Squash commits on merge

---

### Performance Benchmarks

**Build Performance**:
- `npm run build` completes in < 5 minutes on GitHub Actions runner
- Bundle size (JS): < 300KB gzipped
- Bundle size (CSS): < 50KB gzipped
- No unused dependencies (use `depcheck`)

**Runtime Performance**:
- Lighthouse scores (mobile):
  - Performance: > 90
  - Accessibility: 100
  - Best Practices: > 90
  - SEO: 100
- Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

**Chatbot Performance**:
- Embedding generation: < 2s for typical query
- Vector search: < 500ms
- LLM response (streaming): First token in < 2s
- End-to-end query response: < 5s (95th percentile)

---

## Success Criteria

The project is considered **successful** if and only if:

1. ✅ **Textbook builds without errors** (`npm run build` exits 0)
2. ✅ **Chatbot answers accurately** (90%+ correct citations in test queries)
3. ✅ **UI is clean and intuitive** (user testing shows 80%+ task completion)
4. ✅ **Deployment to GitHub Pages is smooth** (< 5 minutes end-to-end)
5. ✅ **System runs fully on free-tier resources** (no paid services in critical path)
6. ✅ **Lighthouse scores meet benchmarks** (Performance > 90, Accessibility 100)
7. ✅ **Spec compliance** (all features have spec/plan/tasks artifacts)
8. ✅ **Zero critical security vulnerabilities** (`npm audit` passes)

**Failure Modes** (immediate blockers):
- ❌ Paid service dependency introduced without ADR and free-tier alternative
- ❌ Chatbot hallucinates or provides incorrect information
- ❌ Build fails on free-tier CI
- ❌ Accessibility violations (WCAG AA)
- ❌ Performance regression (Lighthouse score drops > 10 points)

---

## Governance

### Amendment Process

This constitution can be amended only through the following process:

1. **Proposal**: Submit ADR documenting proposed change, rationale, impact analysis
2. **Review**: Constitution changes reviewed by project maintainers (or user if solo project)
3. **Approval**: Requires explicit approval (documented in ADR)
4. **Migration**: If amendment affects existing code/content, provide migration plan
5. **Update**: Update this document, increment version, record in CHANGELOG.md

**Immutable Principles**:
- Free-tier constraint (Principle III)
- Accuracy and citation requirement (Principle II, VI)
- Spec-driven development (Principle V)

Any attempt to violate these principles must be rejected.

---

### Enforcement

**Pre-Commit**:
- Linting, formatting checks
- Unit tests must pass

**Pull Request**:
- CI checks (build, test, bundle size)
- Constitution compliance checklist:
  - [ ] Change aligns with Clarity Over Complexity (I)
  - [ ] No paid dependencies introduced (III)
  - [ ] UI changes follow Minimalist Design (IV)
  - [ ] Spec artifacts created/updated (V)
  - [ ] Performance budgets met (IX)

**Post-Merge**:
- Lighthouse CI runs on staging
- Manual smoke test of chatbot (if backend changes)

**Periodic Audits**:
- Quarterly review of dependencies (security, license, cost)
- Annual content accuracy review

---

### Conflict Resolution

If a conflict arises between:
- **Constitution vs. User Request**: Constitution wins; explain constraint and propose alternative.
- **Constitution vs. External Requirement** (e.g., platform change): File ADR, propose amendment if necessary.
- **Principles within Constitution**: Order of precedence:
  1. Free-tier constraint (III)
  2. Accuracy & AI-native content (II, VI)
  3. Clarity over complexity (I)
  4. Spec-driven development (V)
  5. All others

---

## Pledge

**We, the creators and maintainers of this project, pledge:**

To uphold **clarity, accessibility, and correctness** as the highest virtues of this work.
To reject complexity that does not serve the learner.
To ensure that every student—regardless of background or resources—can access, understand, and trust this textbook.
To build systems that are transparent, reproducible, and sustainable on free-tier infrastructure.
To iterate with humility, document with rigor, and teach with empathy.

This constitution is our contract with learners everywhere.
**It is not negotiable. It is our standard.**

---

**Version**: 1.0.0
**Ratified**: 2025-12-31
**Last Amended**: 2025-12-31
**Next Review**: 2026-12-31
