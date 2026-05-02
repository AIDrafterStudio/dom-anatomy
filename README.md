# 🔍 DOM Anatomy

> Transform any HTML into an interactive learning laboratory

[![npm version](https://img.shields.io/npm/v/dom-anatomy.svg)](https://www.npmjs.com/package/dom-anatomy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/AIDrafterStudio/dom-anatomy?style=social)](https://github.com/AIDrafterStudio/dom-anatomy)

**DOM Anatomy** is a visual X-Ray tool that helps you understand any webpage's structure by adding an interactive overlay that identifies every HTML element with color-coded outlines, floating tooltips, and an educational inspector panel.

Perfect for:
- 🎓 **Students** learning HTML/CSS
- 👨‍💻 **Developers** inspecting legacy code
- 🎨 **Designers** understanding page structure
- 📚 **Teams** documenting their frontend

---

## ✨ Features

### 🔖 Bookmarklet Mode
- **Zero installation**: Drag to your bookmarks bar
- **Works on any page**: Analyze Wikipedia, GitHub, your own projects
- **One-click toggle**: Activate/deactivate instantly

### 💻 CLI Mode
- **Batch processing**: Analyze entire projects
- **Auto-generated docs**: Creates `MANUAL.md` for each file
- **Bulk reports**: Project-wide structure analysis
- **Watch mode**: Auto-regenerate on file changes

### 🎨 Visual X-Ray Layer
- **Color-coded outlines**: Each HTML tag gets a unique color
  - 🔵 `<main>` - Blue
  - 🟣 `<header>`, `<section>` - Purple
  - 🔵 `<aside>`, `<footer>` - Cyan
  - ⚪ `<div>` - Gray
  - 🟢 `<h1>`-`<h3>`, `<p>`, `<span>` - Green
  - 🟣 `<ul>`, `<li>` - Light purple
  - 🟡 `<script>`, `<link>`, `<meta>` - Amber
  - 🩷 `<i>` - Pink
- **Floating element tooltip**: Identifies the element you're hovering over
- **Inspector panel**: Full element details, hierarchy breadcrumbs, descriptions
- **Legend**: Always-visible color reference

### 🌍 Multi-language
- Spanish (es) 🇪🇸
- English (en) 🇺🇸
- Easily extensible via JSON dictionaries

---

## 🚀 Quick Start

### Bookmarklet (Fastest)

1. **Drag this link to your bookmarks bar**:
   
   [🔍 DOM Anatomy](#bookmarklet)

2. Visit any webpage
3. Click the bookmark
4. Hover over any element to see its anatomy

> **Note**: Some sites with strict CSP (Content Security Policy) like GitHub may block the bookmarklet. Use the CLI or browser extension (coming soon) for those.

### CLI Tool

```bash
# Install globally
npm install -g dom-anatomy

# Analyze a single file
dom-anatomy index.html

# Analyze a project with manuals
dom-anatomy ./src --recursive --manual

# Bulk analysis in English
dom-anatomy ./src -r -b -l en
```

### Node.js API

```javascript
const { analyzeHTML } = require('dom-anatomy');

analyzeHTML('./index.html', {
  outputDir: './docs',
  language: 'en',
  generateManual: true
}).then(results => {
  console.log(`Generated ${results.generated.length} files`);
});
```

---

## 📖 How It Works

### Before
```html
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
</div>
```

### After (X-Ray Mode)
```
┌─ <div> .card ───────────────────┐
│  ┌─ <h2> ──────┐               │
│  │   Title      │               │
│  └──────────────┘               │
│  ┌─ <p> ───────┐               │
│  │  Description │               │
│  └──────────────┘               │
└─────────────────────────────────┘
```

Each element gets:
1. **Colored border** identifying its tag type
2. **Floating label** showing the tag name
3. **Tooltip** on hover with tag, id, and classes
4. **Inspector panel** with full description and CSS

---

## 🛠️ CLI Options

```
Usage: dom-anatomy [options] <input>

Options:
  -o, --output <dir>      Output directory (default: ./dom-anatomy-output)
  -l, --language <lang>   Language: es/en (default: es)
  -r, --recursive         Process directories recursively
  -m, --manual            Generate markdown manuals
  -w, --watch             Watch for changes and regenerate
  -b, --bulk              Generate bulk analysis report
  -h, --help              Display help

Examples:
  dom-anatomy index.html
  dom-anatomy ./src --recursive --manual
  dom-anatomy ./src -r -b -l en
```

---

## 📁 Output Structure

```
dom-anatomy-output/
├── index_xray.html          # Interactive X-Ray version
├── index_MANUAL.md          # Documentation (if --manual)
├── about_xray.html
├── about_MANUAL.md
└── BULK_ANALYSIS_REPORT.md  # Project overview (if --bulk)
```

---

## 🏗️ Architecture

```
dom-anatomy/
├── bookmarklet/          # Browser bookmarklet
│   ├── xray-bookmarklet.js
│   └── demo.html
├── cli/                  # Node.js CLI
│   ├── bin/
│   ├── src/
│   │   ├── analyzer.js
│   │   └── templates/
│   └── tests/
├── i18n/                 # Translations
│   ├── es.json
│   └── en.json
└── .github/
    └── workflows/        # CI/CD
```

---

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a Language

1. Copy `i18n/en.json` to `i18n/[lang].json`
2. Translate all strings
3. Submit a Pull Request

### Feature Requests

Have an idea? [Open an issue](https://github.com/AIDrafterStudio/dom-anatomy/issues) or [start a discussion](https://github.com/AIDrafterStudio/dom-anatomy/discussions).

---

## 🗺️ Roadmap

- [x] Bookmarklet mode
- [x] CLI tool
- [x] Multi-language support
- [x] Bulk analysis
- [x] Auto-generated manuals
- [ ] Browser extension (Chrome/Firefox)
- [ ] VS Code extension
- [ ] Interactive DOM tree visualization
- [ ] CSS specificity analyzer
- [ ] Accessibility (a11y) overlay

---

## 📄 License

MIT © [Your Name](https://github.com/AIDrafterStudio)

---

## 🙏 Acknowledgments

Inspired by [Pesticide](https://github.com/mrmrs/pesticide) and [VisBug](https://github.com/GoogleChromeLabs/ProjectVisBug), but focused on **education** rather than debugging.

Built with ❤️ for the frontend community.
