# Kana Pas Pro

Kana Pas Pro is a quiz website that offers exercises to learn Japanese hiragana and katakana.

This project is a modern fork of [Kana Pro](https://github.com/anzzstuff/kanaquiz), originally created by [Antti Pilto](https://github.com/anzzstuff). The goal of this fork is to migrate the project to modern web technologies and introduce new exercises to learn kana.

Table of contents :

1. [Project setup](#project-setup)
2. [Project architecture](#project-architecture)

## Project Setup

### Dependencies

This will download all dependencies in `node_modules/`

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm dev
```

### Type-Check, Compile and Minify for Production

This will generate a production ready website in `dist/`

```sh
npm build
```

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Architecture

```text
📦 KanaPasPro
├── 📂 public/             # Directly accessible static assets
├── 📂 src/                # Main application source code
│   ├── 📂 assets/         # Non-code resources (styles, images, data)
│   ├── 📂 components/     # Reusable Vue UI components
│   ├── 📂 router/
│   │   └── 📄 index.ts    # Application routing configuration
│   ├── 📂 stores/         # Global state management and game logic (with Pinia)
│   ├── 📂 types/          # TypeScript types
│   ├── 📂 utils/          # Shared utility functions
│   ├── 📂 views/          # Page-level Vue components (routed views)
│   ├── 📄 App.vue         # Root component wrapping the application
│   └── 📄 main.ts         # Application entry point (Vue plugins setup and mounting)
└── 📄 index.html          # Main HTML template loading the Vue app
```
