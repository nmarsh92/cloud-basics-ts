import { AuditableEntity } from "./auditableEntity.js";
import { Entity } from "./entity.js";
import { MultiTenant } from "./multiTenant.js";

/**
 * Multi tenant entity interface.
 */
export interface MultiTenantEntity<TId, TTenantId, TUserId> extends AuditableEntity<TId, TUserId>, MultiTenant<TTenantId>, Entity<TId> { }