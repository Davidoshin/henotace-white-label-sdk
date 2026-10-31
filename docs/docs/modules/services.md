---
id: services
title: ServicesModule
sidebar_label: Service Business
sidebar_position: 13
---

# ServicesModule (`tracklr.services`)

The `ServicesModule` caters to service-oriented businesses, salons, consultancies, repairs, and clinics, providing booking calendars, service catalogs, appointment scheduling, and technician commissions.

---

## Methods

### `getAppointments(params?)`
Fetches upcoming, in-service, and completed bookings.

```typescript
const bookings = await tracklr.services.getAppointments({
  date: '2026-10-31',
  status: 'confirmed'
});
```

### `createAppointment(bookingPayload)`
Books a service appointment for a client with assigned technician/staff.

```typescript
const appointment = await tracklr.services.createAppointment({
  service_id: 8,
  customer_id: 42,
  staff_id: 5,
  scheduled_start: '2026-11-01T14:00:00Z',
  notes: 'Standard 45-min equipment inspection'
});
```

### `getServices()`
Lists bookable services, standard durations, and billable rates.

```typescript
const serviceCatalog = await tracklr.services.getServices();
```
