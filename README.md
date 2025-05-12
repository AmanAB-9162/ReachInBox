# M-Reach-Box App

A sample Next.js project demonstrating structured error handling using React and modern UI patterns.

## 🚀 Project Setup

This project is built using:

* [Next.js 15](https://nextjs.org/)
* React 19+
* Tailwind CSS (optional)
* `class-variance-authority` for managing component variants

## 📦 Installation

Make sure you have **Node.js** installed.

1. Install dependencies:

   ```bash
   npm install
   ```

---

## 🔧 Scripts

Here are the available commands:

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start development server (localhost:3000) |
| `npm run build` | Build the app for production              |
| `npm run start` | Start production server (after build)     |
| `npm run lint`  | Run ESLint on the project                 |

---

## 💽 How to Run Locally

To run the app on your machine:

```bash
npm run dev
```

Then open your browser and visit:

* 👉 [http://localhost:3000](http://localhost:3000) — for local access
* 🌐 [http://<your-local-ip>:3000](http://192.168.xx.xx:3000) — for access from other devices on the same Wi-Fi

To run in production mode:

```bash
npm run build
npm run start
```

It will show output like:

```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Network:      http://192.168.31.77:3000
```

---

## 📁 Folder Structure

```
MREACHBOX/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/
│   ├── [threadId]/
│   │   └── page.tsx
│   ├── archive/
│   │   └── page.tsx
│   ├── drafts/
│   │   └── page.tsx
│   ├── sent/
│   │   └── page.tsx
│   ├── starred/
│   │   └── page.tsx
│   ├── thread/[threadId]/
│   │   └── page.tsx
│   └── trash/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   └── ...40+ other UI components
│   │
│   ├── archive-view.tsx
│   ├── dashboard-nav.tsx
│   ├── drafts-view.tsx
│   ├── email-dashboard.tsx
│   ├── reply-editor.tsx
│   ├── sidebar.tsx
│   └── ...other custom components
│
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── lib/
│   ├── api.ts
│   ├── types.ts
│   └── utils.ts
│
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   └── ...other static assets
│
├── styles/
│   └── globals.css
│
├── node_modules/
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...other config files
---

## 📌 Notes

* Run `npm run build` before `npm run start`.
* Use `npm run dev` for development with hot reload.
* Built with modern React and Next.js best practices.

---
