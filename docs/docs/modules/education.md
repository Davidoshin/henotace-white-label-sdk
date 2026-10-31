---
id: education
title: EducationModule
sidebar_label: Schools & Education
sidebar_position: 15
---

# EducationModule (`tracklr.education`)

The `EducationModule` supports private schools, academies, and training centers with student registries, grade tracking, term billings, and tuition payments.

---

## Methods

### `getStudents(params?)`
Fetches enrolled students with grade level, guardian contact, and fee status.

```typescript
const students = await tracklr.education.getStudents({
  grade_level: 'Grade 5'
});
```

### `recordTuitionPayment(paymentPayload)`
Processes a school fee payment linked to student ledger accounts.

```typescript
await tracklr.education.recordTuitionPayment({
  student_id: 112,
  term: 'First Term 2026/2027',
  amount_paid: 120000,
  payment_method: 'bank_transfer'
});
```
