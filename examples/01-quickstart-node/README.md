# Example 01: Quickstart in Node.js & TypeScript

This example shows how to initialize `@tracklr/sdk` in a Node.js process using a custom memory storage adapter, authenticate a user, and list or switch multi-tenant business contexts.

---

## Prerequisites
- Node.js >= 18
- Built SDK (`npm run build:sdk` at root)

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Run the example
npm start
```

### Optional Environment Variables:
```bash
export TRACKLR_API_URL="https://biz.henotaceai.ng/api/"
export TRACKLR_USER_EMAIL="your-email@example.com"
export TRACKLR_USER_PASSWORD="your-password"
npm start
```
