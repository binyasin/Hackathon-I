# Tasks: Module 1 - The Robotic Nervous System (ROS 2)

**Input**: Design documents from `/specs/001-ros2-nervous-system/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: Not requested in feature specification. Module 1 is educational content, not software requiring automated tests. Validation tasks focus on content quality (word count, links, linting, manual reviews).

**Organization**: Tasks are grouped by user story (chapter) to enable independent implementation and review of each chapter.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (chapter) this task belongs to (US1 = Chapter 1, US2 = Chapter 2, US3 = Chapter 3)
- Include exact file paths in descriptions

---

## Path Conventions

- **Documentation content**: `docs/module1/` at repository root
- **Diagrams**: `docs/module1/assets/` for SVG/PNG files
- **Configuration**: `docusaurus.config.js`, `sidebars.js`, `package.json` at repository root
- **CI/CD**: `.github/workflows/` for GitHub Actions
- **Scripts**: `scripts/` for word count validation, other automation

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Docusaurus project and establish basic structure for Module 1

- [X] T001 Initialize Docusaurus v3.6.x project with classic preset at repository root
- [X] T002 Configure Docusaurus for docs-only mode in docusaurus.config.js (routeBasePath: '/')
- [X] T003 [P] Create Module 1 directory structure: docs/module1/ and docs/module1/assets/
- [X] T004 [P] Configure auto-generated sidebars in sidebars.js for Module 1
- [X] T005 [P] Create intro landing page at docs/intro.md linking to Module 1
- [X] T006 [P] Install Markdown linting dependencies (markdownlint-cli2, markdown-link-check) in package.json
- [X] T007 [P] Create word count validation script at scripts/validate-word-count.js per research.md
- [X] T008 [P] Add npm scripts to package.json: word-count, lint, link-check, build, start
- [X] T009 Configure Docusaurus theme (prism syntax highlighting for python/xml) in docusaurus.config.js
- [X] T010 Create GitHub Actions workflow at .github/workflows/validate-content.yml for content validation
- [X] T011 Create GitHub Actions workflow at .github/workflows/deploy.yml for GitHub Pages deployment

**Checkpoint**: Docusaurus project initialized, directory structure ready, validation tools configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tools and templates that MUST be complete before ANY chapter can be authored

**⚠️ CRITICAL**: No chapter authoring can begin until this phase is complete

- [X] T012 Create chapter Markdown template with frontmatter schema at docs/module1/_template.md per research.md
- [X] T013 [P] Create diagram style guide document at specs/001-ros2-nervous-system/diagram-style-guide.md per research.md
- [X] T014 [P] Verify Docusaurus local development server starts successfully (npm start)
- [X] T015 [P] Verify Docusaurus build completes without errors (npm run build)
- [X] T016 Test word count validation script with sample Markdown file (confirm script works)
- [X] T017 Test Markdown linting with sample file (npm run lint)
- [X] T018 Test link checking with sample file (npm run link-check)

**Checkpoint**: Foundation ready - chapter authoring can now begin in parallel

---

## Phase 3: User Story 1 - Chapter 1: ROS 2 as a Robotic Nervous System (Priority: P1) 🎯 MVP

**Goal**: Deliver Chapter 1 teaching learners what ROS 2 is, the nervous system analogy, and ROS 2's role in humanoid robotics

**Independent Test**: Learner can explain (a) ROS 2 is middleware not OS, (b) nervous system analogy (brain/nerves/muscles), (c) why modular/distributed control is important for humanoid robots

**Functional Requirements**: FR-001 to FR-007 (spec.md lines 106-118)

### Diagram Creation for Chapter 1

- [ ] T019 [P] [US1] Create nervous system analogy diagram in Excalidraw per diagram style guide
- [ ] T020 [US1] Export nervous system analogy diagram as SVG to docs/module1/assets/nervous-system-analogy.svg (<100KB)
- [ ] T021 [US1] Optimize SVG file size if needed (SVGO or online compression tool)

### Content Authoring for Chapter 1

- [ ] T022 [US1] Create chapter1.md file at docs/module1/chapter1.md using template from T012
- [ ] T023 [US1] Write frontmatter for Chapter 1 (title, description, keywords, difficulty: beginner, estimated_time: "25 minutes")
- [ ] T024 [US1] Write Learning Objectives section (2-5 bullet points per spec FR-030)
- [ ] T025 [US1] Write Section 1: What is ROS 2? (FR-001: middleware definition, NOT an OS, ~300-400 words)
- [ ] T026 [US1] Write Section 2: The Nervous System Analogy (FR-002: brain=AI, nerves=ROS2, muscles=actuators, ~400-500 words)
- [ ] T027 [US1] Add nervous system analogy diagram reference in Section 2 with descriptive alt text (T020)
- [ ] T028 [US1] Write Section 3: Modular and Distributed Robot Control (FR-003: modularity, distributed processing, benefits, ~400-500 words)
- [ ] T029 [US1] Write Section 4: ROS 2 in Humanoid Robotics (FR-004: concrete example of coordinating subsystems, ~300-400 words)
- [ ] T030 [US1] Write Key Takeaways section (FR-007: 3-5 bullet points summarizing core concepts)
- [ ] T031 [US1] Add Further Reading section (optional: links to ROS 2 docs, design papers)

### Validation for Chapter 1

- [ ] T032 [US1] Run word count validation on chapter1.md (verify ≤2000 words total, all paragraphs ≤150 words per FR-033, FR-034)
- [ ] T033 [US1] Run Markdown linting on chapter1.md (npm run lint)
- [ ] T034 [US1] Run link checking on chapter1.md (npm run link-check)
- [ ] T035 [US1] Verify all technical terms defined on first use (manual review per spec FR-025, SC-006)
- [ ] T036 [US1] Verify semantic heading hierarchy: H1 → H2 → H3 only (FR-027)
- [ ] T037 [US1] Verify NO installation instructions, CLI tutorials, or code examples in Chapter 1 (FR-005)
- [ ] T038 [US1] Preview chapter in local Docusaurus server (npm start) and check formatting/readability

**Checkpoint**: At this point, Chapter 1 should be complete, validated, and ready for review

---

## Phase 4: User Story 2 - Chapter 2: ROS 2 Communication Primitives (Priority: P2)

**Goal**: Deliver Chapter 2 teaching learners how ROS 2 components communicate via nodes, topics, services, with Python (rclpy) examples

**Independent Test**: Learner can distinguish topics (publish/subscribe, asynchronous) from services (request/response, synchronous) and explain when to use each pattern

**Functional Requirements**: FR-008 to FR-016 (spec.md lines 122-138)

### Diagram Creation for Chapter 2

- [ ] T039 [P] [US2] Create ROS 2 node system diagram in Excalidraw (nodes communicating via topics/services)
- [ ] T040 [P] [US2] Create topic data flow diagram in Excalidraw (publish/subscribe pattern, multiple subscribers)
- [ ] T041 [P] [US2] Create service data flow diagram in Excalidraw (request/response pattern, synchronous)
- [ ] T042 [US2] Export all Chapter 2 diagrams as SVG to docs/module1/assets/ (ros2-node-system.svg, topic-flow.svg, service-flow.svg)
- [ ] T043 [US2] Optimize all Chapter 2 SVG file sizes if needed (<100KB each)

### Content Authoring for Chapter 2

- [X] T044 [US2] Create chapter2.md file at docs/module1/chapter2.md using template from T012
- [X] T045 [US2] Write frontmatter for Chapter 2 (title, description, keywords, difficulty: beginner, estimated_time: "35 minutes")
- [X] T046 [US2] Write Learning Objectives section (2-5 bullet points)
- [X] T047 [US2] Write Section 1: ROS 2 Nodes (FR-008: independent processes, communication, ~300-400 words)
- [X] T048 [US2] Write Section 2: Topics - Publish/Subscribe Model (FR-009: asynchronous, one-to-many, use cases, ~500-600 words)
- [X] T049 [US2] Add topic data flow diagram reference in Section 2 with descriptive alt text (T040)
- [X] T050 [US2] Write Section 3: Services - Request/Response Model (FR-010: synchronous, one-to-one, use cases, ~400-500 words)
- [X] T051 [US2] Add service data flow diagram reference in Section 3 with descriptive alt text (T041)
- [X] T052 [US2] Write Section 4: Actions (FR-011: high-level overview, long-running tasks, feedback/cancellation, ~200-300 words)
- [X] T053 [US2] Write Section 5: Data Flow Between AI Agents and Robot Controllers (FR-012: Python AI → ROS 2 control, ~300-400 words)
- [X] T054 [US2] Write Section 6: Introduction to rclpy (FR-013: conceptual role of ROS 2 Python library, ~200-300 words)
- [X] T055 [US2] Add minimal Python code snippets if needed (FR-014: max 3-4 snippets, 5-10 lines each, illustrative only, with inline comments)
- [X] T056 [US2] Create Topics vs Services comparison table (FR-016: data flow pattern, use cases, examples)
- [X] T057 [US2] Write Key Takeaways section (FR-016: 3-5 bullet points + comparison table reference)
- [X] T058 [US2] Add Further Reading section (optional: links to ROS 2 communication docs)

### Validation for Chapter 2

- [X] T059 [US2] Run word count validation on chapter2.md (verify ≤2000 words total, all paragraphs ≤150 words per FR-033, FR-034)
- [ ] T060 [US2] Run Markdown linting on chapter2.md (npm run lint)
- [ ] T061 [US2] Run link checking on chapter2.md (npm run link-check)
- [ ] T062 [US2] Verify all technical terms defined on first use (manual review per FR-025, SC-006)
- [ ] T063 [US2] Verify semantic heading hierarchy: H1 → H2 → H3 only (FR-027)
- [ ] T064 [US2] Verify NO DDS internals, QoS tuning, or performance benchmarking in Chapter 2 (FR-015)
- [ ] T065 [US2] Verify code snippets are minimal (5-10 lines), illustrative, with comments (FR-014)
- [ ] T066 [US2] Preview chapter in local Docusaurus server (npm start) and check formatting/readability

**Checkpoint**: At this point, Chapter 2 should be complete, validated, and ready for review

---

## Phase 5: User Story 3 - Chapter 3: Humanoid Robot Description with URDF (Priority: P3)

**Goal**: Deliver Chapter 3 teaching learners how humanoid robot structure is represented in URDF (links, joints, kinematic chains)

**Independent Test**: Learner can explain what URDF represents (robot structure), identify links/joints/kinematic chains in a simple humanoid arm, and describe how URDF enables simulation/control

**Functional Requirements**: FR-017 to FR-024 (spec.md lines 142-156)

### Diagram Creation for Chapter 3

- [ ] T067 [P] [US3] Create humanoid arm diagram in Excalidraw (shoulder → upper arm → elbow → forearm with link/joint labels)
- [ ] T068 [P] [US3] Create kinematic chain tree diagram in Excalidraw (torso root → arms/legs → hands/feet)
- [ ] T069 [US3] Export all Chapter 3 diagrams as SVG to docs/module1/assets/ (humanoid-arm-links-joints.svg, kinematic-chain.svg)
- [ ] T070 [US3] Optimize all Chapter 3 SVG file sizes if needed (<100KB each)

### Content Authoring for Chapter 3

- [X] T071 [US3] Create chapter3.md file at docs/module1/chapter3.md using template from T012
- [X] T072 [US3] Write frontmatter for Chapter 3 (title, description, keywords, difficulty: intermediate, estimated_time: "30 minutes")
- [X] T073 [US3] Write Learning Objectives section (2-5 bullet points)
- [X] T074 [US3] Write Section 1: Purpose of URDF in Humanoid Robots (FR-017: machine-readable robot description for sim/viz/control, ~300-400 words)
- [X] T075 [US3] Write Section 2: Links, Joints, and Kinematic Chains (FR-018: definitions, analogies to bones/human joints, ~500-600 words)
- [X] T076 [US3] Add humanoid arm diagram reference in Section 2 with descriptive alt text (T067)
- [X] T077 [US3] Write Section 3: Representing Humanoid Body Structure (FR-019: hierarchical tree, torso root, limbs as branches, ~400-500 words)
- [X] T078 [US3] Add kinematic chain tree diagram reference in Section 3 with descriptive alt text (T068)
- [X] T079 [US3] Write Section 4: URDF, Simulation, Visualization, and Control (FR-020: relationships, virtual testing, rendering, motion planning, ~400-500 words)
- [X] T080 [US3] Write Section 5: Digital Twins and URDF (FR-021: Digital Twin concept, URDF as foundation, forward reference to later modules, ~200-300 words)
- [X] T081 [US3] Add minimal URDF XML snippets if needed (FR-022: max 2-3 snippets, 10-15 lines each, heavily annotated with comments)
- [X] T082 [US3] Write Key Takeaways section (FR-024: 3-5 bullet points summarizing core concepts)
- [X] T083 [US3] Add Further Reading section (optional: links to URDF docs, Digital Twin resources)

### Validation for Chapter 3

- [X] T084 [US3] Run word count validation on chapter3.md (verify ≤2000 words total, all paragraphs ≤150 words per FR-033, FR-034)
- [ ] T085 [US3] Run Markdown linting on chapter3.md (npm run lint)
- [ ] T086 [US3] Run link checking on chapter3.md (npm run link-check)
- [ ] T087 [US3] Verify all technical terms defined on first use (manual review per FR-025, SC-006)
- [ ] T088 [US3] Verify semantic heading hierarchy: H1 → H2 → H3 only (FR-027)
- [ ] T089 [US3] Verify NO complex XML dumps, only minimal annotated snippets in Chapter 3 (FR-022)
- [ ] T090 [US3] Verify focus is on understanding URDF, not authoring mastery (FR-023)
- [ ] T091 [US3] Preview chapter in local Docusaurus server (npm start) and check formatting/readability

**Checkpoint**: All three chapters should now be complete, validated, and ready for review

---

## Phase 6: Cross-Chapter Integration & Validation

**Purpose**: Ensure all chapters work together cohesively and meet module-level requirements

- [ ] T092 [P] Verify progressive complexity across chapters (Chapter 1 → 2 → 3 builds on previous concepts per spec)
- [ ] T093 [P] Verify internal cross-references use semantic links (FR-031: e.g., `[ROS 2 nodes](./chapter2.md#nodes)`)
- [ ] T094 Run word count validation on all chapters together (verify Module 1 total ~5400 words)
- [ ] T095 Run Markdown linting on all Module 1 files (npm run lint)
- [ ] T096 Run link checking on all Module 1 files (npm run link-check)
- [ ] T097 Build Docusaurus site and verify no errors (npm run build)
- [ ] T098 [P] Verify all diagrams display correctly in built site (check docs/module1/assets/ images)
- [ ] T099 [P] Verify frontmatter metadata is consistent across all chapters (title, description, keywords, difficulty, estimated_time)
- [ ] T100 Verify Docusaurus sidebar auto-generates correctly for Module 1 (intro → chapter1 → chapter2 → chapter3)

**Checkpoint**: Module 1 integration complete, ready for multi-stage review

---

## Phase 7: Content Review & Quality Assurance

**Purpose**: Multi-stage review process to ensure content accuracy, pedagogy, accessibility, and RAG compatibility

### Technical Review (ROS 2 Subject Matter Expert)

- [ ] T101 Technical reviewer validates Chapter 1 accuracy (ROS 2 definitions, nervous system analogy, modularity/distributed concepts)
- [ ] T102 Technical reviewer validates Chapter 2 accuracy (nodes, topics, services, actions, rclpy, Python snippets)
- [ ] T103 Technical reviewer validates Chapter 3 accuracy (URDF purpose, links/joints, kinematic chains, Digital Twins)
- [ ] T104 Address technical review feedback and update chapters as needed

### Pedagogical Review (Educational Expert)

- [ ] T105 Pedagogical reviewer validates Chapter 1 learning flow (concept-first, progressive disclosure, beginner-friendly)
- [ ] T106 Pedagogical reviewer validates Chapter 2 learning flow (builds on Chapter 1, clear examples, comparison table effective)
- [ ] T107 Pedagogical reviewer validates Chapter 3 learning flow (builds on Chapter 2, diagrams aid understanding)
- [ ] T108 Address pedagogical review feedback and update chapters as needed

### Accessibility Review (Target Audience Comprehension)

- [ ] T109 Accessibility reviewer validates Chapter 1 understandability (plain language, no assumed robotics knowledge, terms defined)
- [ ] T110 Accessibility reviewer validates Chapter 2 understandability (technical concepts explained clearly, code snippets conceptual)
- [ ] T111 Accessibility reviewer validates Chapter 3 understandability (URDF complexity managed, analogies effective)
- [ ] T112 Address accessibility review feedback and update chapters as needed

### AI Review (RAG Chatbot Testing)

- [ ] T113 Test RAG chatbot with 10+ queries on Chapter 1 content (verify 90%+ citation accuracy per spec SC-005)
- [ ] T114 Test RAG chatbot with 10+ queries on Chapter 2 content (verify accurate citations for topics vs services)
- [ ] T115 Test RAG chatbot with 10+ queries on Chapter 3 content (verify accurate citations for URDF concepts)
- [ ] T116 Document RAG chatbot test results and identify any content structure improvements needed
- [ ] T117 Address RAG chatbot feedback (improve self-contained sections, add explicit context if needed)

**Checkpoint**: All reviews complete, feedback addressed, Module 1 content ready for deployment

---

## Phase 8: Deployment & Performance Validation

**Purpose**: Deploy to GitHub Pages and validate performance/accessibility benchmarks

- [ ] T118 [P] Configure GitHub Pages in repository settings (source: gh-pages branch)
- [ ] T119 [P] Update docusaurus.config.js with correct url and baseUrl for GitHub Pages
- [ ] T120 Test GitHub Actions validate-content.yml workflow on pull request (verify word count, linting, link checks pass)
- [ ] T121 Merge Module 1 to main branch and trigger deploy.yml GitHub Actions workflow
- [ ] T122 Verify deployment to GitHub Pages successful (site accessible at https://<username>.github.io/<repo-name>/)
- [ ] T123 Run Lighthouse audit on deployed site (mobile): Performance >90, Accessibility=100, Best Practices >90, SEO=100 (per plan.md)
- [ ] T124 Verify Core Web Vitals on deployed site: LCP <2.5s, FID <100ms, CLS <0.1 (per plan.md)
- [ ] T125 Verify page load time <2s on 3G connection (Chrome DevTools network throttling)
- [ ] T126 Verify bundle size <300KB gzipped (check build output in GitHub Actions logs)
- [ ] T127 Test site on desktop browsers (Chrome, Firefox, Safari, Edge) and mobile browsers (iOS Safari, Chrome Mobile)
- [ ] T128 [P] Verify all diagrams display correctly on deployed site (check SVG rendering)
- [ ] T129 [P] Verify keyboard navigation works (Ctrl/Cmd+K for search, tab navigation)
- [ ] T130 [P] Test screen reader compatibility (NVDA, JAWS, or VoiceOver) on deployed site

**Checkpoint**: Module 1 successfully deployed to production, all performance benchmarks met

---

## Phase 9: Polish & Documentation

**Purpose**: Final improvements and project documentation updates

- [ ] T131 [P] Create Module 1 completion summary document at specs/001-ros2-nervous-system/COMPLETION.md (lessons learned, metrics)
- [ ] T132 [P] Update project README.md with Module 1 description and link to deployed site
- [ ] T133 [P] Create CHANGELOG.md entry for Module 1 release (v1.0.0 - Module 1: ROS 2 Nervous System)
- [ ] T134 [P] Archive all research notes and design documents for reference
- [ ] T135 [P] Document diagram sources (Excalidraw files) for future updates
- [ ] T136 Run final validation of all spec success criteria (SC-001 to SC-009 from spec.md)
- [ ] T137 Celebrate Module 1 completion and prepare for Module 2 planning 🎉

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T011) - BLOCKS all chapter authoring
- **Chapter Authoring (Phases 3-5)**: All depend on Foundational phase completion (T012-T018)
  - Chapters can be authored in parallel (if multiple content creators available)
  - Or sequentially in priority order (Chapter 1 → Chapter 2 → Chapter 3)
- **Integration (Phase 6)**: Depends on all three chapters complete (T019-T091)
- **Review (Phase 7)**: Depends on Integration completion (T092-T100)
- **Deployment (Phase 8)**: Depends on Reviews complete and feedback addressed (T101-T117)
- **Polish (Phase 9)**: Depends on successful deployment (T118-T130)

### User Story (Chapter) Dependencies

- **Chapter 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other chapters
- **Chapter 2 (P2)**: Can start after Foundational (Phase 2) - Builds conceptually on Chapter 1 but can be authored independently
- **Chapter 3 (P3)**: Can start after Foundational (Phase 2) - Builds conceptually on Chapters 1 & 2 but can be authored independently

**Note**: While chapters build conceptually (learners read sequentially), content authoring can be done in parallel because each chapter is self-contained (FR-032) and defines terms on first use (FR-025).

### Within Each Chapter Phase

- Diagrams before content authoring (need diagram files to reference in Markdown)
- Content authoring before validation (need content to validate)
- All validation tasks can run in parallel once content complete

### Parallel Opportunities

- **Setup (Phase 1)**: T003, T004, T005, T006, T007, T008 can run in parallel (different files)
- **Foundational (Phase 2)**: T013, T014, T015, T017, T018 can run in parallel (different files/independent checks)
- **Once Foundational complete**: All three chapters (Phases 3-5) can be authored in parallel by different content creators
- **Within Chapter 1**: T019 diagram creation can run while authoring other sections (independent until T027 needs the file)
- **Within Chapter 2**: T039, T040, T041 diagrams can all be created in parallel (different files)
- **Within Chapter 3**: T067, T068 diagrams can be created in parallel (different files)
- **Integration (Phase 6)**: T092, T093, T098, T099 can run in parallel (different validation aspects)
- **Deployment (Phase 8)**: T118, T119, T128, T129, T130 can run in parallel (different aspects)
- **Polish (Phase 9)**: T131, T132, T133, T134, T135 can run in parallel (different documentation files)

---

## Parallel Example: Chapter 1 Authoring

```bash
# Launch all Chapter 1 diagram creation together:
Task: "Create nervous system analogy diagram in Excalidraw per diagram style guide"
# (Single diagram for Chapter 1, so no parallel opportunity here)

# Launch multiple Chapter 1 content sections together (different sections, independent):
Task: "Write Section 1: What is ROS 2? (~300-400 words)"
Task: "Write Section 3: Modular and Distributed Robot Control (~400-500 words)"
Task: "Write Section 4: ROS 2 in Humanoid Robotics (~300-400 words)"
# (Section 2 depends on diagram T020/T027, so sequence that separately)
```

---

## Parallel Example: All Chapters Together

```bash
# If multiple content creators available, launch all chapters in parallel after Foundational phase:

# Content Creator A: Chapter 1 (US1)
Task: "Create chapter1.md at docs/module1/chapter1.md"
Task: "Write all Chapter 1 sections (T022-T031)"

# Content Creator B: Chapter 2 (US2)
Task: "Create chapter2.md at docs/module1/chapter2.md"
Task: "Write all Chapter 2 sections (T044-T058)"

# Content Creator C: Chapter 3 (US3)
Task: "Create chapter3.md at docs/module1/chapter3.md"
Task: "Write all Chapter 3 sections (T071-T083)"

# All chapters complete independently, then proceed to Integration (Phase 6)
```

---

## Implementation Strategy

### MVP First (Chapter 1 Only)

1. Complete Phase 1: Setup (T001-T011)
2. Complete Phase 2: Foundational (T012-T018) - CRITICAL, blocks chapter authoring
3. Complete Phase 3: Chapter 1 (T019-T038)
4. **STOP and VALIDATE**: Run all Chapter 1 validation tasks
5. Optional: Deploy Chapter 1 alone for early feedback

### Incremental Delivery

1. Complete Setup + Foundational → Tools ready
2. Add Chapter 1 → Validate independently → Deploy (MVP!)
3. Add Chapter 2 → Validate independently → Deploy
4. Add Chapter 3 → Validate independently → Deploy
5. Run Integration + Reviews → Final deployment
6. Each chapter adds value without breaking previous chapters

### Parallel Team Strategy

With multiple content creators:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Content Creator A: Chapter 1 (T019-T038)
   - Content Creator B: Chapter 2 (T039-T066)
   - Content Creator C: Chapter 3 (T067-T091)
3. Chapters complete in parallel, then Integration (Phase 6)
4. Reviews can also be parallelized (different reviewers for technical, pedagogical, accessibility, AI)

---

## Notes

- **[P] tasks**: Different files, no dependencies on incomplete tasks - can run in parallel
- **[Story] label**: Maps task to specific chapter for traceability (US1=Chapter 1, US2=Chapter 2, US3=Chapter 3)
- **Each chapter independently testable**: Self-contained content (FR-032), terms defined on first use (FR-025), validation tasks per chapter
- **Commit frequently**: After each task or logical group (e.g., after completing a section, after creating a diagram)
- **Stop at checkpoints**: Validate chapters independently before moving to next priority
- **Content constraints**: Max 2000 words/chapter (FR-033), max 150 words/paragraph (FR-034), max 3 diagrams/chapter
- **No tests in traditional sense**: This is educational content, not software. "Testing" = content validation (word count, linting, links, manual reviews, RAG chatbot queries)
- **Avoid**: Vague tasks, cross-chapter dependencies that break independence, exceeding word count limits, complex diagrams, installation instructions

---

## Success Criteria Validation (from spec.md)

After completing all tasks, validate against spec success criteria (SC-001 to SC-009):

- **SC-001**: Total reading time under 90 minutes (Chapter 1: 25 min, Chapter 2: 35 min, Chapter 3: 30 min) → Verify via estimated_time frontmatter
- **SC-002**: 90% of learners can answer 4/5 comprehension questions on Chapter 1 → Manual RAG chatbot testing (Phase 7, T113)
- **SC-003**: 85% can distinguish topics vs services in scenarios → Manual RAG chatbot testing (Phase 7, T114)
- **SC-004**: 85% can identify links/joints/kinematic chains in diagram → Manual RAG chatbot testing (Phase 7, T115)
- **SC-005**: RAG chatbot 90%+ citation accuracy (50+ queries across chapters) → Phase 7, T113-T117
- **SC-006**: Zero undefined technical terms → Phase 4-6 validation tasks (T035, T062, T087)
- **SC-007**: Word count compliance (≤2000/chapter, ≤150/paragraph) → Phase 4-6 validation tasks (T032, T059, T084)
- **SC-008**: Learner satisfaction ≥4.0/5.0 → Post-deployment survey (future task, not in this plan)
- **SC-009**: 80% can explain ROS 2's role to peers → Post-deployment survey (future task, not in this plan)

**Total Tasks**: 137 tasks across 9 phases
