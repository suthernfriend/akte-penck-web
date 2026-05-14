# Akte Penck — Web

Statische Site fuer das fiktive Krimi-ARG »Akte Penck«. Astro + Tailwind v4, deployt auf GitHub Pages.

Semi-privates Projekt — kein SEO, kein Tracking, `noindex` in jeder Seite.

## Stack

- [Astro 5](https://astro.build/) (Content Collections, Static Build)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- GitHub Actions → GitHub Pages

## Lokale Entwicklung

```bash
nvm use            # optional, .nvmrc -> Node 20
npm install
npm run dev        # http://localhost:4321/akte-penck-web/
npm run build      # baut nach ./dist
npm run preview    # serviert ./dist lokal
```

Falls die URL beim Devserver komisch aussieht: das `base` in `astro.config.mjs` haengt vor jeder Route. Wenn das Repo nicht `akte-penck-web` heisst, dort anpassen (s.u.).

## Vor dem ersten Deploy

In `astro.config.mjs` `site` und `base` anpassen:

```js
site: "https://<dein-github-user>.github.io",
base: "/<repo-name>/",
```

Wenn das Repo auf `<user>.github.io` heisst (User Page statt Project Page):

```js
site: "https://<dein-github-user>.github.io",
base: "/",
```

Ausserdem in den GitHub-Repo-Settings unter **Pages**:
- Source: **GitHub Actions**

Push auf `main` triggert dann automatisch den Build + Deploy.

## Neuen Artikel anlegen

Datei nach `src/content/articles/JJJJ-MM-TT-slug.md`. Der Dateiname (ohne `.md`) wird zur URL: `/archiv/JJJJ-MM-TT-slug/`.

```markdown
---
title: "Headline des Artikels"
publication: "LVZ"             # LVZ oder BILD
section: "Polizeiticker"       # frei waehlbar
date: 2026-05-14
author: "M. Schmidt"
kicker: "Ermittlungen"         # optional — kleiner farbiger Tag ueber der Headline
lead: "Anrissabsatz, kommt direkt unter die Headline."
hero_image: "/images/dateiname.jpg"      # optional, Pfad in public/
hero_caption: "Bildunterschrift"         # optional
tags: ["polizei", "vermisst"]            # optional
draft: false                              # true blendet den Artikel aus
---

Fliesstext in Markdown. **Fett**, _kursiv_, [Links](https://example.com),
Listen, Bilder ![alt](/images/foo.jpg) — alles ueblich.

## Zwischenueberschrift

> Zitat-Block fuer O-Toene.
```

### Felder kurz erklaert

| Feld          | Pflicht | Wirkung                                                       |
|---------------|---------|---------------------------------------------------------------|
| `title`       | ja      | Headline                                                      |
| `publication` | ja      | `LVZ` oder `BILD` — entscheidet, welches Layout gerendert wird |
| `section`     | ja      | Ressort, wird in der LVZ-Sektionsnav hervorgehoben falls Match |
| `date`        | ja      | YYYY-MM-DD — bestimmt Sortierreihenfolge im Archiv             |
| `author`      | ja      | Byline                                                        |
| `lead`        | ja      | Anrissabsatz unter der Headline                                |
| `kicker`      | nein    | Kleiner Kicker-Tag ueber der Headline (LVZ-Style)              |
| `hero_image`  | nein    | Bildpfad — Datei muss in `public/...` liegen                   |
| `hero_caption`| nein    | Bildunterschrift                                              |
| `tags`        | nein    | Stringliste, derzeit nur auf Karten sichtbar                   |
| `draft`       | nein    | `true` = ausgeblendet von index/archiv/getStaticPaths          |

## Chronik-Eintrag anlegen (Schema schon scharf, Seite folgt)

Datei nach `src/content/chronik/JJJJ-MM-TT-slug.md`:

```markdown
---
date: 2026-05-10
title: "Polizeieinsatz am Cospudener See"
description: "Festnahme von zwei Verdaechtigen, Drogenfund."
related_article: "2026-05-13-cossi-drogenfund"   # optional, ohne .md
---
```

Die Chronik-Seite (`/chronik/`) selbst wird in Iteration 2 gebaut — Schema ist schon da, damit Eintraege jetzt schon gesammelt werden koennen.

## Bilder und Dokumente

- Bilder: nach `public/images/`
- PDFs: nach `public/documents/`

Im Frontmatter und Markdown werden Pfade absolut angegeben (`/images/foo.jpg`). Astro setzt automatisch den `base` davor.

## Struktur

```
src/
  content.config.ts          Content-Collections-Schema
  content/articles/          Artikel als Markdown
  content/chronik/           (vorbereitet, leer)
  layouts/
    BaseLayout.astro         Dossier-Frame, Fonts, Header, Footer
    ArticleLayout.astro      Dispatch auf Publication-spezifische Variante
  components/
    SiteHeader.astro
    SiteFooter.astro
    ArticleCard.astro
    article/LvzArticle.astro    LVZ-Reproduktion
    article/BildArticle.astro   Stub fuer Iteration 2
  pages/
    index.astro              Startseite mit 5 neuesten
    archiv/index.astro       Volles Archiv, gruppiert nach Monat
    archiv/[slug].astro      Einzelartikel-Route
  styles/global.css          Tailwind v4 @theme + Prose-Defaults
  lib/url.ts                 withBase()-Helper
public/
  favicon.svg
  images/                    Bilder
  documents/                 PDFs (in dieser Iteration nicht verlinkt)
```

## Wordmark-Font umschalten (LVZ)

Default ist Bodoni Moda. Drei Optionen sind eingebaut, in `src/components/article/LvzArticle.astro` die Klasse austauschen:

- `lvz-wordmark-bodoni` — kontrastreich, klassisch
- `lvz-wordmark-caslon` — robuster, zeitungstauglich
- `lvz-wordmark-cormorant` — eleganter

Alle drei Schriften werden bereits via Google Fonts geladen, kein zusaetzlicher Schritt noetig.

## Roadmap (Iteration 2)

- Chronik-Seite (`/chronik/`)
- Dokumente-Galerie (`/dokumente/`)
- Impressum (`/impressum/`)
- Filter im Archiv (Publikation, Tags)
- BILD-Layout vollstaendig
- ggf. weitere Publikationen
