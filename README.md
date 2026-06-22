# 🎙 Speako

> Speak your thoughts. We'll turn them into notes.

Speako is a voice-to-markdown notes app. Hit record, speak naturally, and your words are automatically structured into clean Markdown — ready to preview, save, and export.

**Live:** https://y0geshmainkar.github.io/speko/

---

## Features

- 🎙 **Voice recording** — one-tap mic using the browser Web Speech API
- 📝 **Live transcript** — see your words appear in real time as you speak
- ✨ **Auto formatting** — transcript is intelligently structured into headings, bullets, and paragraphs
- 🤖 **AI formatting** — optional Claude AI mode for smarter, more natural Markdown output
- 👁 **Markdown preview** — rendered preview before saving
- 💾 **Persistent notes** — notes saved to localStorage via Redux Persist, survive page refresh
- 📋 **Notes history** — browse all saved notes with title, date, and word count
- 📤 **Export** — download any note as a `.md` file
- 🗑 **Delete** — remove notes you no longer need

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict mode) |
| State | Redux Toolkit + Redux Persist |
| Routing | React Router v6 |
| Styles | SCSS Modules |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Markdown | react-markdown |
| Tests | Jest + React Testing Library |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Navigation

Speako uses a **dual navigation** pattern:

**Desktop** — sticky top navbar with logo and links

**Mobile** — fixed bottom bar (like a native app)

```
Desktop (≥ 768px)          Mobile (< 768px)
┌─────────────────────┐    ┌─────────────────────┐
│ 🎙 Speako  Record Notes Settings │    │  page content       │
└─────────────────────┘    │                     │
                            └─────────────────────┘
                            │ 🎙 Record │ 📋 Notes │ ⚙️ Settings │
                            └─────────────────────┘
```

The active route is highlighted and uses `aria-current="page"` for screen readers. Both navbars are keyboard accessible with visible focus states.

---

## Project Structure

```
src/
 app/           → Redux store, typed hooks
 features/
   recorder/    → slice, RecorderPage, hook wiring
   notes/       → slice, selectors
   preview/     → MarkdownPreview component
 pages/         → Home, NotesList, NoteDetail, Settings
 components/    → Navbar
 services/      → claudeApi.ts
 hooks/         → useSpeechRecognition.ts
 styles/        → global SCSS, variables, mixins
 types/         → Note, RecorderStatus, Web Speech API
 utils/         → markdownFormatter.ts, exportNote.ts
```

---

## Getting Started

```bash
git clone https://github.com/Y0geshmainkar/speko.git
cd speko
npm install
npm run dev
```

Open http://localhost:5173/speko/

### Optional — AI formatting

Create a `.env.local` file:
```
VITE_CLAUDE_API_KEY=your_anthropic_api_key
```

Get a key at https://console.anthropic.com

---

## Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run test         # Jest tests
```

---

## CI/CD

Every push to `main` triggers the GitHub Actions pipeline:

```
lint → type-check → test → build → deploy to gh-pages
```
