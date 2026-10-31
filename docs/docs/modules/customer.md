---
id: customer
title: CustomerModule
sidebar_label: Customers & CRM
sidebar_position: 9
---

# CustomerModule (`tracklr.customer`)

The `CustomerModule` manages customer accounts, loyalty balances, credit debt ledgers, address books, and communication histories.

---

## Methods

### `getCustomers(params?)`
Fetches customers with phone/email search and balance summaries.

```typescript
const customers = await tracklr.customer.getCustomers({
  search: '08012345678',
  page: 1
});
```

### `createCustomer(data)`
Creates a new customer record.

```typescript
const newCustomer = await tracklr.customer.createCustomer({
  name: 'Amaka Obi',
  phone: '08098765432',
  email: 'amaka@example.com',
  address: '15 Victoria Island, Lagos'
});
```

### `getCustomerById(id)` & `updateCustomer(id, data)`
Retrieves and updates individual customer profiles and credit limits.

```typescript
const customer = await tracklr.customer.getCustomerById(42);
await tracklr.customer.updateCustomer(42, { credit_limit: 100000 });
```
