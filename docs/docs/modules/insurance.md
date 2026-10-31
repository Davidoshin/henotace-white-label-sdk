---
id: insurance
title: InsuranceModule
sidebar_label: Insurance & Claims
sidebar_position: 14
---

# InsuranceModule (`tracklr.insurance`)

The `InsuranceModule` provides insurance policy enrollment, beneficiary registries, claim submissions, and underwriting tracking for health, equipment, and loss-protection policies.

---

## Methods

### `getPolicies(params?)`
Fetches policies subscribed by or offered to the tenant.

```typescript
const policies = await tracklr.insurance.getPolicies();
```

### `submitClaim(claimPayload)`
Submits an insurance incident claim with damage/loss proof.

```typescript
const claim = await tracklr.insurance.submitClaim({
  policy_id: 10,
  incident_date: '2026-10-25',
  amount_claimed: 75000,
  description: 'Water leak damaged warehouse packaging cartons'
});
```
