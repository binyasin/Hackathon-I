# Diagram Style Guide: Module 1 - The Robotic Nervous System

**Purpose**: Ensure visual consistency across all diagrams in Module 1 chapters
**Tool**: Excalidraw (https://excalidraw.com) - free, web-based, no account required
**Format**: SVG (Scalable Vector Graphics)
**File Size Limit**: < 100KB per diagram

---

## Color Palette

Use Docusaurus brand colors for consistency with the site theme:

- **Primary (Docusaurus Blue)**: `#3578E5` - Use for key elements, main components
- **Secondary (Docusaurus Teal)**: `#25C2A0` - Use for supporting elements, data flows
- **Neutral (Dark Gray)**: `#1C1E21` - Use for text labels, borders, connections
- **Background**: `#FFFFFF` (white) or transparent

### Color Usage Examples

- **Chapter 1 (Nervous System Analogy)**:
  - AI/Brain layer: Primary blue
  - ROS 2 middleware: Secondary teal
  - Actuators/Muscles: Neutral gray

- **Chapter 2 (Communication Primitives)**:
  - ROS 2 nodes: Primary blue
  - Topic/service arrows: Secondary teal
  - Data messages: Neutral gray

- **Chapter 3 (URDF Structure)**:
  - Links (rigid bodies): Primary blue
  - Joints (connections): Secondary teal
  - Labels/text: Neutral gray

---

## Typography

- **Font Family**: System fonts (Arial, Helvetica, or default Excalidraw font)
- **Font Size**:
  - Component labels: 16-20px (readable at normal zoom)
  - Detail labels: 12-14px (secondary information)
- **Text Style**: Keep concise, **<5 words per label** where possible

---

## Layout and Composition

- **Flow Direction**: Left-to-right where possible (matches reading direction)
- **Spacing**: Maintain consistent padding between elements (avoid crowding)
- **Alignment**: Use grid/snap-to-grid for clean alignment
- **Hierarchy**: Larger shapes for primary concepts, smaller for details

---

## Line Styles

- **Solid Lines**: Use for actual connections, data flows, relationships
- **Dashed Lines**: Use for optional elements, future components, or conceptual relationships
- **Arrow Styles**:
  - Single arrow (`→`): Unidirectional flow (e.g., publish to topic)
  - Double arrow (`↔`): Bidirectional flow (e.g., request/response)
  - No arrow: Static relationship (e.g., parent-child in URDF tree)

---

## Iconography

Use simple geometric shapes to represent concepts:

- **Rectangles**: For components, nodes, processes
- **Circles/Ovals**: For data messages, topics, abstract concepts
- **Arrows**: For data flow, communication direction
- **Trees/Hierarchies**: For parent-child relationships (URDF structure)

Avoid complex icons or detailed illustrations. Keep it simple and conceptual.

---

## Diagram-Specific Guidelines

### Chapter 1: Nervous System Analogy

- **Elements**: AI layer, ROS 2 middleware, Actuator layer
- **Layout**: Vertical or horizontal stack with bidirectional arrows
- **Key Visual**: Show ROS 2 in the middle (like spinal cord/nerves)

### Chapter 2: Communication Primitives

- **Node Diagram**: Multiple rectangles (nodes) connected by arrows
- **Topic Flow**: Pub/sub pattern with one publisher → multiple subscribers
- **Service Flow**: Request/response with single arrow back-and-forth

### Chapter 3: URDF Structure

- **Links & Joints**: Alternate rectangles (links) with circles (joints)
- **Kinematic Chain**: Tree structure from root link branching to end effectors
- **Labels**: Clearly mark link names and joint types

---

## Workflow: Creating a Diagram

1. **Create in Excalidraw**:
   - Visit https://excalidraw.com
   - Use simple shapes and arrows
   - Follow color palette and layout guidelines
   - Add text labels (keep concise, <5 words)

2. **Export as SVG**:
   - Excalidraw → Export → SVG
   - Check file size (aim for <50KB unoptimized)

3. **Optimize SVG** (if needed):
   - If file >50KB, use SVGO: https://jakearchibald.github.io/svgomg/
   - Remove unnecessary metadata, whitespace
   - Target <100KB final size

4. **Save to Repository**:
   - Place SVG in `front-end-book/my-website/docs/module1/assets/`
   - Use descriptive filename: `nervous-system-analogy.svg`, `topic-flow.svg`, etc.

5. **Add to Markdown**:
   ```markdown
   ![Descriptive alt text (1-2 sentences explaining the diagram for screen readers)](./assets/diagram-name.svg)
   ```

6. **Write Alt Text**:
   - 1-2 sentences describing key relationships
   - Example: "Diagram showing ROS 2 as the nervous system connecting AI (brain) to actuators (muscles) via bidirectional communication."

---

## Accessibility Checklist

- [ ] Color contrast is sufficient (text readable against background)
- [ ] Diagram is understandable in grayscale (don't rely on color alone)
- [ ] Alt text explains key concepts shown in diagram
- [ ] Text labels are large enough to read (minimum 12px)
- [ ] Diagram has a clear visual hierarchy (main concepts stand out)

---

## Planned Diagrams for Module 1

| Chapter | Diagram Name | Description |
|---------|--------------|-------------|
| 1 | `nervous-system-analogy.svg` | AI ↔ ROS 2 ↔ Actuators (nervous system metaphor) |
| 2 | `ros2-node-system.svg` | Multiple nodes communicating via topics/services |
| 2 | `topic-flow.svg` | Publish/subscribe pattern with multiple subscribers |
| 2 | `service-flow.svg` | Request/response pattern, synchronous communication |
| 3 | `humanoid-arm-links-joints.svg` | Shoulder → upper arm → elbow → forearm (link/joint structure) |
| 3 | `kinematic-chain.svg` | Tree: torso → arms, legs → hands, feet |
| 3 | `urdf-hierarchy.svg` | Root link → child links tree structure |

---

## Examples & References

For inspiration (but keep simpler than these):
- ROS 2 official diagrams: https://docs.ros.org/en/rolling/Concepts.html
- Excalidraw community library: https://libraries.excalidraw.com/

**Remember**: Prioritize clarity over complexity. These are educational diagrams for beginners, not technical blueprints.
