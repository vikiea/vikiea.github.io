# vikiea.github.io

Personal homepage and blog scaffold built with Hugo. Chinese is served at the root site, and English is served under `/en/`.

## Usage

See [docs/USAGE.md](docs/USAGE.md) for the full guide: local preview, adding app cards, writing future posts, building, and publishing with GitHub Pages.

## Local development

```bash
hugo server --environment theme-vikiea --buildDrafts
```

## Production build

```bash
hugo --environment theme-vikiea --gc --minify
```

GitHub Pages is published by `.github/workflows/pages.yml`.

## Theme switching

```bash
# Default local App portfolio theme
hugo server --environment theme-vikiea --buildDrafts
```

The current site uses the local custom theme in `themes/vikiea-apps`. The Hugo config layout keeps theme-specific overrides under `config/theme-*`, so future third-party themes can be added and tested without changing the default App portfolio presentation.
