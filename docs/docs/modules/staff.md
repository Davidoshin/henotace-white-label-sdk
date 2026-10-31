---
id: staff
title: StaffModule
sidebar_label: Staff & HR
sidebar_position: 7
---

# StaffModule (`tracklr.staff`)

The `StaffModule` provides role-based access control (RBAC), employee directories, shift clock-in/out attendance tracking, absence requests, salary ledgers, and staff activity audits.

---

## Methods

### `list(params?, options?)`
Fetches staff members filtered by branch, active status, or department.

```typescript
const staffList = await tracklr.staff.list({
  branch: 1,
  is_active: true
});
```

---

### `clockIn()` & `clockOut()`
Registers biometric or mobile shift attendance timestamps for the current logged-in employee.

```typescript
// Clock in at start of shift
await tracklr.staff.clockIn();

// Clock out at end of shift
await tracklr.staff.clockOut();
```

---

### `create(data, options?)` & `update(id, data, options?)`
Creates new staff logins with defined roles (`cashier`, `manager`, `production_lead`, `inventory_clerk`).

```typescript
const newStaff = await tracklr.staff.create({
  first_name: 'Grace',
  last_name: 'Adeleke',
  email: 'grace@tracklr.app',
  phone: '08012345678',
  role: 'cashier',
  branch: 1
});
```

---

### `requestAbsence(data)`
Submits employee leave or emergency absence requests for manager review.

```typescript
await tracklr.staff.requestAbsence({
  reason: 'Medical Leave',
  start_date: '2026-11-05',
  end_date: '2026-11-07'
});
```
