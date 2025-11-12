# WYSIWYG XML Editor

A modern, accessible XML editor built with Next.js, Slate, and TypeScript.

## Features

- **WYSIWYG Editing**: Rich text editing powered by Slate
- **XML Support**: Round-trip XML serialization
- **Rich Elements**: Support for images, videos, tables, and links
- **Raw XML View**: Edit and validate raw XML
- **Theme Support**: Dark/light mode with system preference detection
- **Keyboard Shortcuts**: Efficient editing with hotkeys
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive**: Works on mobile and desktop

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Slate** - Customizable rich text editor
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Zod** - Schema validation
- **next-themes** - Theme management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
wysiwyg-xml-editor/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   ├── editor/              # Editor page
│   └── about/               # About page
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   └── editor/              # Editor components (Phase 2)
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── slate/               # Slate editor logic (Phase 2)
│   ├── serialization/       # XML serialization (Phase 2)
│   └── schemas/             # Zod schemas (Phase 2)
└── __tests__/               # Test files (Phase 2)
```

## Development Phases

### Phase 1: Foundation (Completed ✅)
- [x] Next.js project setup
- [x] Tailwind CSS configuration
- [x] Theme provider (dark/light mode)
- [x] Base layout (Header, Footer)
- [x] Home and About pages
- [x] Responsive navigation

### Phase 2: Core Editor (In Progress)
- [ ] Zod schemas for element types
- [ ] Slate TypeScript types
- [ ] Basic Slate editor
- [ ] Element renderer components
- [ ] XML serialization functions
- [ ] Table normalization

### Phase 3: Dialogs & UX
- [ ] Raw XML dialog
- [ ] Properties dialogs (Image/Video/Link/Table)
- [ ] Toolbar with insert buttons
- [ ] Keyboard shortcuts
- [ ] XML paste handling

### Phase 4: Polish
- [ ] Autosave to localStorage
- [ ] Unit tests
- [ ] Accessibility audit

## Keyboard Shortcuts (Planned)

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + K` - Insert/Edit Link
- `Ctrl/Cmd + Shift + M` - Insert Image
- `Ctrl/Cmd + Shift + V` - Insert Video
- `Ctrl/Cmd + Shift + T` - Insert Table
- `Ctrl/Cmd + E` - Toggle Raw XML Editor
- `Ctrl/Cmd + /` - Show shortcuts help

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
