# js-workshop

A personal workshop for front-end exploration — coding exercises, UI widgets, accessibility experiments, and reusable templates.

## Contents

### 🧩 `widgets/`
Vanilla JS implementations of common UI components.

| Widget | Description |
|---|---|
| `accordion/` | Collapsible content panels |
| `autocomplete/` | Type-ahead search (React) |
| `calendar/` | Date picker / calendar |
| `card/` | Card layout component |
| `carousel/` | Image / content carousel |
| `dropdown/` | Dropdown menu |
| `fetch-and-render-json/` | Data fetching + rendering pattern |
| `hash-group-by/` | Group-by utility using hash |
| `ical-popup/` | iCal-style popup |
| `next-neighbour/` | Nearest-neighbour interaction |
| `range-slider/` | Range input slider |
| `sortable-table/` | Sortable, paginated table |
| `spreadsheet/` | Editable spreadsheet grid |
| `star-rating/` | Star rating input |
| `tabs/` | Tabbed navigation |
| `tooltip/` | Tooltip on hover |
| `virtual-list/` | Virtualized long list |

### 💡 `js-coding/`
JavaScript fundamentals, utilities, and classic data-structure / algorithm exercises.

- **Top-level utilities** — `curry`, `debounce`, `throttle`, `deep-copy`, `flat`, `memoize`, `observable`, `promise-all`, `promisify`, `range`, `shuffle`, `fetch`
- **`algorithms/`** — sorting, graph algorithms, traversal (bubble / merge / quick / heap / insertion / selection sort, Dijkstra, union-find, topological order, Eulerian path, convex hull, tree traversal, quick-select)
- **`structures/`** — data structures (linked list, doubly-linked list, hash table, graph, tree, queue, stack, priority queue, LLRB tree, MinQ)

### 🧪 `leet-solutions/`
LeetCode solutions organized by difficulty.

| Folder | Contents |
|---|---|
| `easy/` | Easy-difficulty solutions |
| `medium/` | Medium-difficulty solutions |
| `hard/` | Hard-difficulty solutions |
| `custom/` | Custom variations and extras |

### ♿ `a11y/`
Accessibility patterns and demos.
- `semantic-layout/` — semantic HTML structure examples

### 📋 `templates/`
Boilerplate scaffolds for quick experiments.
- `full-template/` — a complete starter template

## Conventions

- Folder and file names use **kebab-case** (lowercase, hyphen-separated)
- React components retain **PascalCase** filenames (e.g. `App.js`)
- Each widget is self-contained — open the local `index.html` to view
