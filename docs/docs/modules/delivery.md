---
id: delivery
title: DeliveryModule
sidebar_label: Delivery & Logistics
sidebar_position: 10
---

# DeliveryModule (`tracklr.delivery`)

The `DeliveryModule` manages dispatch orders, rider assignments, delivery tracking numbers, and fulfillment milestones.

---

## Methods

### `getOrders(params?)`
Fetches dispatch orders filtered by status (`pending`, `assigned`, `in_transit`, `delivered`).

```typescript
const pendingDeliveries = await tracklr.delivery.getOrders({
  status: 'in_transit'
});
```

### `createOrder(orderPayload)`
Books a delivery for an outgoing retail sale or bulk production dispatch.

```typescript
const dispatch = await tracklr.delivery.createOrder({
  sale_id: 1045,
  recipient_name: 'John Doe',
  recipient_phone: '08123456789',
  delivery_address: '10 Admiralty Way, Lekki',
  fee: 2500
});
```

### `updateOrderStatus(orderId, status)`
Updates fulfillment progress.

```typescript
await tracklr.delivery.updateOrderStatus(dispatch.id, 'delivered');
```
