---
id: http-client
title: HttpClient Engine & Custom Requests
sidebar_label: HttpClient Engine
sidebar_position: 16
---

# HttpClient Engine & Custom Requests (`tracklr.http`)

The `HttpClient` class is the high-performance underlying engine of `@tracklr/sdk`. While domain modules provide typed shortcuts, you can also dispatch custom HTTP calls directly through the client while preserving authentication, multi-tenancy headers, and 401 retry queues.

---

## Direct Request Methods

### `get<T>(path, options?)`
```typescript
interface CustomMetric {
  conversion_rate: number;
}

const data = await tracklr.get<CustomMetric>('analytics/custom-metric/');
```

### `post<T>(path, body, options?)`
```typescript
const result = await tracklr.post('integrations/webhook-sync/', {
  external_event: 'order.dispatched',
  payload: { id: 9812 }
});
```

### `put<T>(path, body, options?)` & `patch<T>(path, body, options?)`
```typescript
await tracklr.patch('settings/notifications/', {
  email_alerts_enabled: true
});
```

### `delete<T>(path, options?)`
```typescript
await tracklr.delete('temp-exports/report-202610.csv/');
```

---

## Low-Level Request Interception

If an endpoint does not require authentication (e.g. public health check), pass `requiresAuth: false`:

```typescript
const health = await tracklr.http.request('healthz/', {
  method: 'GET',
  requiresAuth: false
});
```
