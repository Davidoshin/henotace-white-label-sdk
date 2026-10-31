---
id: finance
title: FinanceModule
sidebar_label: Finance & Ledgers
sidebar_position: 6
---

# FinanceModule (`tracklr.finance`)

The `FinanceModule` provides comprehensive double-entry accounting, liquidity account management (bank, petty cash, POS escrow), trial balance reporting, balance sheets, and cash transfers.

---

## Methods

### `getLiquidAccounts()`
Fetches all cash book accounts (bank accounts, cash registers, mobile money tills) with live balances.

```typescript
const accounts = await tracklr.finance.getLiquidAccounts();
accounts.forEach(acc => {
  console.log(`${acc.name}: ₦${acc.current_balance}`);
});
```

---

### `createLiquidAccount(payload)`
Registers a new financial account in the chart of accounts.

```typescript
await tracklr.finance.createLiquidAccount({
  name: 'Zenith Bank Operations',
  method_type: 'bank',
  bank_name: 'Zenith Bank',
  account_number: '1012345678',
  opening_balance: 500000
});
```

---

### `transferBetweenAccounts(transferPayload)`
Records an internal transfer between accounts (e.g. moving POS card settlements into main operating account).

```typescript
await tracklr.finance.transferBetweenAccounts({
  source_account_id: 1,
  destination_account_id: 2,
  amount: 150000,
  reference: 'TRF-POS-SETTLEMENT-OCT31',
  description: 'Sweep daily POS sales to operating account'
});
```

---

### `getTrialBalance(params?)` & `getBalanceSheet(params?)`
Fetches standard financial accounting statements with date filters.

```typescript
const trialBalance = await tracklr.finance.getTrialBalance({
  period: 'yearly',
  fiscal_year: 2026
});
```
