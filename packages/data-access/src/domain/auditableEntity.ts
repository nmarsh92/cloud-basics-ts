import { Auditable } from "./auditable.js";
import { Entity } from "./entity.js";

/**
 * Auditable entity interface.
 */
export interface AuditableEntity<TId, TUserId> extends Auditable<TUserId>, Entity<TId> { }