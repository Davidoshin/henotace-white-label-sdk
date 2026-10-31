---
id: installation
title: Installation & Setup
sidebar_label: Installation
sidebar_position: 2
---

# Installation & Setup

`@tracklr/sdk` can be consumed either as an internal monorepo workspace package or as a standalone dependency in third-party Node.js/TypeScript applications.

---

## 1. Monorepo Workspace (Internal Apps)

Inside the `Tracklr-business-management` monorepo, `@tracklr/sdk` is linked via npm workspaces:

```json title="retail-web-app/package.json"
{
  "dependencies": {
    "@tracklr/sdk": "*"
  }
}
```

Whenever you run `npm install` from the repository root:
```bash
npm install
```
npm creates a symlink pointing directly to `packages/tracklr-sdk/dist/`.

To build or recompile the SDK inside the monorepo:
```bash
npm run build:sdk
```

---

## 2. Standalone Package Installation

If consuming `@tracklr/sdk` from outside the monorepo:

### Using NPM
```bash
npm install @tracklr/sdk
```

### Using Bun
```bash
bun add @tracklr/sdk
```

### Using Yarn / PNPM
```bash
yarn add @tracklr/sdk
# or
pnpm add @tracklr/sdk
```

---

## 3. TypeScript Configuration

`@tracklr/sdk` comes bundled with complete `.d.ts` declaration files. Ensure your `tsconfig.json` has `moduleResolution` set to `node` or `bundler`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true
  }
}
```

Next, see the [Configuration Guide](./configuration.md) to initialize your client instance.
