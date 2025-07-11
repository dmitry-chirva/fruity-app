# Fruity App

A lightweight **React + TypeScript** single‑page application that lets users browse, group and analyse a catalogue of fruits.

---

## ▶️ Live Demo

[Link to demo](https://fruity-app-ebon.vercel.app/)

---

## Features

| Category         | Details                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Fetch & cache    | Retrieves fruit data from a configurable REST API (`FRUIT_API`).                     |
| List & table views | Switch between **List** and **Table** layouts.                                            |
| Dynamic grouping | Group by *Family*, *Order*, *Genus* or view flat list.                                    |
| Jar & calories   | Add any fruit(s) to a personal "Jar", view running calorie total and a pie‑chart breakdown. |

---

## Tech Stack

* **React 18 / TS 5** – UI & state logic
* **Zustand** – global, minimal state slice
* **Ant Design v5** – ready‑made components & design token system
* **Recharts** – responsive charts (pie)
* **Vite** – blazing‑fast bundler & dev‑server
* **Sass Modules** – scoped, theme‑friendly styles

---

## Getting Started

### 1 · Clone & install

```bash
$ git clone https://github.com/dmitry-chirva/fruity-app.git
$ cd fruity-app
$ npm i        # or pnpm / yarn
```

### 2 · Environment

Create `.env.local` in the project root:

```bash
VITE_FRUIT_API=https://www.fruityvice.com
```

> `VITE_FRUIT_API` is injected at build time; feel free to swap in a mock during development.
> **API reference:** [https://www.fruityvice.com](https://www.fruityvice.com)

### 3 · Run dev server

```bash
npm run dev   # http://localhost:5173
```

Hot‑reload is enabled out of the box.

### 4 · Production build

```bash
npm run build  # dist/ ready for any static host
```

Preview locally:

```bash
npm run preview  # http://localhost:4173
```

---

## Project Structure

```
src/
 ├─ api/               # API layer (fetch, adapters)
 ├─ features/          # Domain UI (fruit, jar, …)
 │   ├─ fruit/
 │   │   ├─ views/     # Table/List subviews
 │   │   └─ FruitSection.tsx
 │   └─ jar/
 ├─ shared/            # Reusable utils, hooks, enums…
 ├─ store/             # Zustand slices (typed)
 ├─ App.tsx
 └─ main.tsx           # Vite entry‑point
```

---

## Useful Scripts

| Script            | Purpose                      |
|-------------------|------------------------------|
| `npm run dev`     | Launch Vite dev‑server with HMR |
| `npm run build`   | Production bundle (ES + CSS) |
| `npm run preview` | Serve built files locally    |
| `npm run lint`    | ESLint with recommended rules |
| `npm run format`  | Format the code              |