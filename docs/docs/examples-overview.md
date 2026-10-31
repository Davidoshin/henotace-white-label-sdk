---
id: examples-overview
title: Real-World Runnable Examples
sidebar_label: Runnable Examples
sidebar_position: 5
---

# Real-World Runnable Examples

The Tracklr repository includes five standalone, verified, and runnable example workflows located in the `Tracklr-business-management/examples/` directory.

---

## Example 1: Quickstart (Node.js & TypeScript)
* **Directory:** `examples/01-quickstart-node/`
* **Features:**
  - Instantiating `TracklrClient`
  - Authenticating with email and password
  - Inspecting authenticated user & active business tenant
  - Listing available businesses and switching active tenant context
* **Run:**
  ```bash
  cd examples/01-quickstart-node
  npm install
  npm start
  ```

---

## Example 2: Retail POS Checkout Flow
* **Directory:** `examples/02-retail-pos-checkout/`
* **Features:**
  - Querying retail products by category
  - Real-time stock validation
  - Cart total, tax, and discount computation
  - Creating a POS sale record (`tracklr.retail.createSale`)
  - Formatting thermal receipt payload
* **Run:**
  ```bash
  cd examples/02-retail-pos-checkout
  npm install
  npm start
  ```

---

## Example 3: Production Batch Manufacturing Lifecycle
* **Directory:** `examples/03-production-lifecycle/`
* **Features:**
  - Inspecting bill of materials (BOM) and recipe costs
  - Initiating a production batch (`tracklr.production.createBatch`)
  - Logging scrap/waste events (`tracklr.production.recordWaste`)
  - Updating batch status (`planned` -> `in_progress` -> `completed`)
  - Computing final yield percentage
* **Run:**
  ```bash
  cd examples/03-production-lifecycle
  npm install
  npm start
  ```

---

## Example 4: White-Label Partner Administration
* **Directory:** `examples/04-whitelabel-admin/`
* **Features:**
  - White-label partner authentication
  - Querying strictly scoped tenant businesses (`tracklr.admin.whitelabel.getScopedBusinesses`)
  - Reviewing pending bank transfer receipts
  - Crediting customer wallets with audit note (`tracklr.admin.whitelabel.manualWalletTopUp`)
  - Configuring Flutterwave payment keys & plan rates
* **Run:**
  ```bash
  cd examples/04-whitelabel-admin
  npm install
  npm start
  ```

---

## Example 5: Custom Storage Adapter (Capacitor / Mobile / Node)
* **Directory:** `examples/05-custom-storage/`
* **Features:**
  - Implementing the `StorageAdapter` interface
  - Thread-safe token read/write hooks
  - Testing token persistence across client restarts
* **Run:**
  ```bash
  cd examples/05-custom-storage
  npm install
  npm start
  ```
