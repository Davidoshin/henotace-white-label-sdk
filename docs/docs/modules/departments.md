---
id: departments
title: DepartmentsModule
sidebar_label: Departments
sidebar_position: 11
---

# DepartmentsModule (`tracklr.departments`)

The `DepartmentsModule` handles business organizational hierarchy, departmental units, cost center tagging, and manager assignments.

---

## Methods

### `getDepartments()`
Fetches all configured departments for the active business tenant.

```typescript
const depts = await tracklr.departments.getDepartments();
```

### `createDepartment(deptData)` & `updateDepartment(id, updates)`
Registers and modifies department records.

```typescript
const newDept = await tracklr.departments.createDepartment({
  name: 'Quality Assurance',
  code: 'QA-01',
  description: 'Product quality, recipe testing, and hygiene compliance'
});
```
