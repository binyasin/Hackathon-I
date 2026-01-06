# Content Writing Guide: Module 1 - The Robotic Nervous System (ROS 2)

**Purpose**: Guide for human authors to complete remaining chapters (Chapter 2 and Chapter 3)
**Created**: 2026-01-02
**Status**: Chapter 1 Complete ✅ | Chapter 2 & 3 Pending ⏳

---

## Quick Status

### ✅ Completed
- **Phase 1 (Setup)**: Docusaurus initialized, validation tools ready
- **Phase 2 (Foundation)**: Templates created, all tools tested and working
- **Chapter 1**: Complete with 1,345 words, passes all validations

### ⏳ Remaining Work
- **Chapter 2**: ROS 2 Communication Primitives (Topics, Services, Nodes)
- **Chapter 3**: URDF and Robot Structure (Links, Joints, Kinematic Chains)
- **Diagrams**: Need to create 6-7 SVG diagrams using Excalidraw or similar tool

---

## Writing Workflow

### Step 1: Create Chapter File
1. Copy template: `cp docs/module1/_template.md docs/module1/chapter2.md`
2. Update frontmatter with chapter-specific details
3. Save and preview in Docusaurus (`npm start`)

### Step 2: Write Content
Follow this structure for each chapter:

```markdown
---
title: "[Chapter Title]"
description: "[50-150 char summary]"
keywords: ["keyword1", "keyword2", ...]
difficulty: beginner
estimated_time: "[25-35 minutes]"
---

# [Chapter Title]

[1-2 sentence intro]

## Learning Objectives
- [3-5 action-oriented objectives]

## [Section 1: Main Concept]
[300-500 words, plain language, define terms on first use]

## [Section 2: Another Concept]
[300-500 words, include diagram if needed]

## [Section 3: Application/Example]
[300-500 words, concrete examples]

## Key Takeaways
- [3-5 bullet points summarizing core concepts]

## Further Reading
- [Optional external resources]
```

### Step 3: Validate
Run these commands from `front-end-book/my-website/`:

```bash
# Word count (must pass: ≤2000 words total, ≤150 words/paragraph)
node scripts/validate-word-count.js docs/module1/chapter2.md

# Markdown linting
npm run lint

# Link checking
npx markdown-link-check docs/module1/chapter2.md
```

---

## Content Requirements

### Mandatory (FR = Functional Requirement from spec.md)

**All Chapters**:
- ✅ **FR-025**: Define all technical terms on first use
- ✅ **FR-027**: Use only H2 (##) and H3 (###) headings
- ✅ **FR-033**: Total chapter ≤2000 words
- ✅ **FR-034**: Each paragraph ≤150 words
- ✅ **FR-032**: Plain language (10th-grade reading level)

**Chapter 2 Specific**:
- ✅ **FR-008**: Explain ROS 2 nodes (independent processes)
- ✅ **FR-009**: Explain topics (publish/subscribe, asynchronous, one-to-many)
- ✅ **FR-010**: Explain services (request/response, synchronous, one-to-one)
- ✅ **FR-011**: High-level overview of actions (long-running tasks, feedback)
- ✅ **FR-012**: Data flow between AI agents and robot controllers
- ✅ **FR-013**: Introduce rclpy (ROS 2 Python library) conceptually
- ✅ **FR-014**: Minimal Python code snippets (max 3-4, each 5-10 lines, illustrative only)
- ✅ **FR-015**: NO DDS internals, QoS tuning, or performance benchmarking
- ✅ **FR-016**: Include Topics vs Services comparison table

**Chapter 3 Specific**:
- ✅ **FR-017**: Purpose of URDF (machine-readable robot description)
- ✅ **FR-018**: Define links, joints, kinematic chains (use human body analogies)
- ✅ **FR-019**: Representing humanoid body structure (hierarchical tree)
- ✅ **FR-020**: URDF's role in simulation, visualization, and control
- ✅ **FR-021**: Digital Twin concept (forward reference to future modules)
- ✅ **FR-022**: Minimal URDF XML snippets (max 2-3, 10-15 lines, heavily annotated)
- ✅ **FR-023**: Focus on understanding URDF, not authoring mastery
- ✅ **FR-024**: Include Key Takeaways (3-5 bullets)

---

## Diagram Creation

### Tools
- **Excalidraw** (recommended): https://excalidraw.com/ - Free, browser-based, exports SVG
- **Draw.io / diagrams.net**: https://app.diagrams.net/ - Free, more formal diagrams
- **Figma** (free tier): https://figma.com - Professional design tool

### Style Guide
**Reference**: `specs/001-ros2-nervous-system/diagram-style-guide.md`

**Key Principles**:
- Simple, clean line drawings (not photorealistic)
- High contrast (black/dark gray on white background)
- Large, readable labels (12-14px sans-serif font)
- Annotations with brief callouts (5-10 words max)
- Color-blind safe (use shapes/patterns, not color alone)
- Export as SVG (target <100KB file size)

### Diagrams Needed

**Chapter 2** (3 diagrams):
1. **ros2-node-system.svg**: Multiple nodes communicating via topics/services
   - Show 3-4 nodes as boxes
   - Topics as arrows (one-to-many, labeled)
   - Services as double arrows (request/response)

2. **topic-flow.svg**: Publish/subscribe pattern
   - 1 publisher node → topic → multiple subscriber nodes
   - Show data flow direction
   - Label: "asynchronous, one-to-many"

3. **service-flow.svg**: Request/response pattern
   - Client node ↔ Service server node
   - Bi-directional arrows
   - Label: "synchronous, one-to-one"

**Chapter 3** (2 diagrams):
1. **humanoid-arm-links-joints.svg**: Simple robot arm
   - Shoulder → Upper arm → Elbow → Forearm → Wrist → Hand
   - Links as solid rectangles/cylinders
   - Joints as circles at connection points
   - Labels identifying each link and joint

2. **kinematic-chain.svg**: Hierarchical tree
   - Torso (root) at top
   - Arms and legs branching from torso
   - Hands/feet at ends
   - Show parent-child relationships

### Diagram Workflow
1. Create diagram in Excalidraw/Draw.io
2. Export as SVG
3. Save to: `front-end-book/my-website/docs/module1/assets/[diagram-name].svg`
4. Optimize if >100KB: Use https://jakearchibald.github.io/svgomg/
5. Reference in markdown:
   ```markdown
   ![Descriptive alt text explaining the diagram](./assets/diagram-name.svg)
   ```

---

## Code Snippet Guidelines

### Chapter 2: Python (rclpy) Examples

**Rules**:
- Max 3-4 snippets total
- Each snippet: 5-10 lines only
- Illustrative purpose (not runnable production code)
- Include inline comments explaining each line

**Example Format**:
```python
# Import ROS 2 Python client library
import rclpy
from rclpy.node import Node

# Create a simple node that publishes messages
class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')  # Node name
        # Create publisher for topic (explained in text above)
```

### Chapter 3: URDF XML Snippets

**Rules**:
- Max 2-3 snippets total
- Each snippet: 10-15 lines only
- Heavily annotated with XML comments
- Show simplified structure (not full complex URDF)

**Example Format**:
```xml
<!-- Define a robot with a simple arm -->
<robot name="simple_arm">

  <!-- Base link (shoulder) -->
  <link name="shoulder">
    <visual>
      <!-- How the link looks in simulation -->
    </visual>
  </link>

  <!-- Joint connecting shoulder to upper arm -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="shoulder"/>  <!-- Connects to shoulder -->
    <child link="upper_arm"/>   <!-- Connects to upper arm -->
  </joint>

</robot>
```

---

## Validation Checklist

Before marking a chapter complete, verify:

### Content Quality
- [ ] Total word count ≤2000 (use `node scripts/validate-word-count.js`)
- [ ] All paragraphs ≤150 words
- [ ] All technical terms defined on first use
- [ ] Only H2/H3 headings used (no H4+)
- [ ] Plain language (avoid jargon, use analogies)
- [ ] Frontmatter complete (title, description, keywords, difficulty, estimated_time)

### Structure
- [ ] Learning Objectives section (2-5 action-oriented bullets)
- [ ] 3-4 main sections (300-500 words each)
- [ ] Key Takeaways section (3-5 bullets)
- [ ] Further Reading section (optional, 2-3 quality external links)

### Diagrams
- [ ] All diagrams created and saved as SVG in `assets/` folder
- [ ] File sizes <100KB each
- [ ] Descriptive alt text for accessibility
- [ ] Diagrams referenced in content with context

### Code (if applicable)
- [ ] Chapter 2: Python snippets ≤10 lines each, max 3-4 total
- [ ] Chapter 3: URDF snippets ≤15 lines each, max 2-3 total
- [ ] All code heavily commented
- [ ] Code serves illustrative purpose (not production-ready)

### Automated Validation
Run these commands and confirm all pass:
```bash
cd front-end-book/my-website

# Word count validation
node scripts/validate-word-count.js docs/module1/chapter2.md
node scripts/validate-word-count.js docs/module1/chapter3.md

# Markdown linting (some warnings OK, no errors)
npm run lint

# Link checking
npx markdown-link-check docs/module1/chapter2.md
npx markdown-link-check docs/module1/chapter3.md

# Preview in browser
npm start
# Then open http://localhost:3000 and navigate to chapters
```

---

## User Story Mapping

### Chapter 1 ✅ (Complete)
**User Story 1 (P1)**: Understanding ROS 2 as Middleware
- Learner understands ROS 2 is middleware, not an OS
- Learner grasps nervous system analogy
- Learner explains modular/distributed architecture

### Chapter 2 ⏳ (Pending)
**User Story 2 (P2)**: Understanding ROS 2 Communication Primitives
- Learner distinguishes topics from services
- Learner explains publish/subscribe pattern
- Learner understands when to use topics vs services

### Chapter 3 ⏳ (Pending)
**User Story 3 (P3)**: Understanding URDF and Robot Structure
- Learner explains what URDF represents
- Learner identifies links, joints, kinematic chains
- Learner describes URDF's role in simulation/control

---

## Common Pitfalls to Avoid

### ❌ Don't Do This:
- Don't assume prior ROS knowledge (define everything)
- Don't use complex jargon without plain-language definitions
- Don't include full code examples (only short snippets)
- Don't show complete URDF files (only annotated excerpts)
- Don't include installation instructions (out of scope)
- Don't reference advanced topics (DDS, QoS, performance tuning)
- Don't exceed word limits (2000 total, 150/paragraph)

### ✅ Do This:
- Define every technical term on first use
- Use analogies to explain abstract concepts
- Keep sentences short and active voice
- Include diagrams to visualize concepts
- Provide concrete examples (humanoid robot scenarios)
- Test with validation tools before submitting
- Preview in Docusaurus to check formatting

---

## Example: Chapter 2 Outline (Template)

```markdown
---
title: "ROS 2 Communication Primitives"
description: "Learn how ROS 2 components communicate using nodes, topics, and services for coordinated robot control."
keywords: ["ROS 2", "nodes", "topics", "services", "publish-subscribe", "message passing"]
difficulty: beginner
estimated_time: "35 minutes"
---

# ROS 2 Communication Primitives

By the end of this chapter, you'll understand how different parts of a robot communicate through ROS 2 using nodes, topics, and services.

## Learning Objectives
- Explain what ROS 2 nodes are and why they're independent processes
- Distinguish between topics (publish/subscribe) and services (request/response)
- Identify when to use topics vs services in robot applications
- Understand the role of rclpy (ROS 2 Python library) at a conceptual level

## ROS 2 Nodes
[300-400 words: independent processes, communication, modularity]

## Topics: Publish/Subscribe Model
[500-600 words: asynchronous, one-to-many, use cases, diagram]
![Topic data flow diagram](./assets/topic-flow.svg)

## Services: Request/Response Model
[400-500 words: synchronous, one-to-one, use cases, diagram]
![Service data flow diagram](./assets/service-flow.svg)

## Actions (High-Level Overview)
[200-300 words: long-running tasks, feedback, cancellation]

## Data Flow: AI to Robot Controllers
[300-400 words: Python AI agents sending commands via ROS 2]

## Introduction to rclpy
[200-300 words: conceptual role, not detailed API documentation]

```python
# Simple example of creating a node with rclpy
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')  # Create node with name
        self.get_logger().info('Node started')  # Log message
```

## Topics vs Services Comparison

| Aspect | Topics | Services |
|--------|--------|----------|
| Pattern | Publish/Subscribe | Request/Response |
| Communication | Asynchronous | Synchronous |
| Cardinality | One-to-many | One-to-one |
| Use Case | Sensor data streams | On-demand computations |
| Example | Camera images | Calculate path |

## Key Takeaways
- [3-5 bullets summarizing main concepts]

## Further Reading
- [ROS 2 communication docs]
- [rclpy API reference]
```

---

## Next Steps

1. **Create Chapter 2**:
   - Copy template to `chapter2.md`
   - Write content following outline above
   - Create 3 diagrams (nodes, topics, services)
   - Validate with tools
   - Preview in Docusaurus

2. **Create Chapter 3**:
   - Copy template to `chapter3.md`
   - Write content about URDF, links, joints
   - Create 2 diagrams (arm, kinematic chain)
   - Add minimal URDF XML snippets
   - Validate with tools
   - Preview in Docusaurus

3. **Final Review**:
   - Read all 3 chapters in sequence
   - Check for consistency in terminology
   - Verify learning progression (Chapter 1 → 2 → 3)
   - Run full validation suite
   - Deploy to GitHub Pages (automated via CI/CD)

---

## Support & Resources

**Validation Tools**:
- Word count: `node scripts/validate-word-count.js <file>`
- Linting: `npm run lint`
- Link check: `npx markdown-link-check <file>`

**Documentation**:
- Spec: `specs/001-ros2-nervous-system/spec.md`
- Plan: `specs/001-ros2-nervous-system/plan.md`
- Research: `specs/001-ros2-nervous-system/research.md`
- Diagram Style Guide: `specs/001-ros2-nervous-system/diagram-style-guide.md`

**Preview**:
- Local server: `cd front-end-book/my-website && npm start`
- Open: http://localhost:3000

**Questions?**
- Refer to spec.md for requirements (FR-001 through FR-034)
- Check plan.md for content structure decisions
- Review research.md for pedagogical approach and diagram strategy

---

**Good luck writing! Remember: plain language, concrete examples, and learner-focused explanations are key.** 🚀
