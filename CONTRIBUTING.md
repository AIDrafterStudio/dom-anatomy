# Contributing to DOM Anatomy

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/dom-anatomy.git`
3. Create a branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Run tests: `npm test`
6. Commit: `git commit -am 'Add my feature'`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

## 📋 Guidelines

### Code Style
- Use ESLint configuration provided
- Run `npm run format` before committing
- Follow existing naming conventions

### Adding a Language

1. Copy `i18n/en.json` to `i18n/[language-code].json`
2. Translate all strings
3. Add the language to the README supported languages list
4. Submit a PR

### Adding Tag Descriptions

Edit the appropriate `i18n/[lang].json` file and add descriptions for new HTML tags in the `tags` section.

### Reporting Bugs

Use the [issue tracker](https://github.com/yourusername/dom-anatomy/issues) with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS version

## 🏗️ Project Structure

```
dom-anatomy/
├── bookmarklet/      # Browser bookmarklet code
├── cli/              # Node.js CLI tool
│   ├── src/          # Source code
│   │   ├── analyzer.js
│   │   └── templates/
│   ├── tests/        # Jest tests
│   └── bin/          # CLI entry point
├── i18n/             # Language dictionaries
└── .github/          # GitHub Actions, templates
```

## 📝 Commit Messages

Use conventional commits:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `test: add tests`
- `refactor: improve code structure`

## 🙏 Thank You!

Every contribution, no matter how small, helps make DOM Anatomy better for the community.
