import { MultiTenant } from "../domain/multiTenant.js";
import { MultiTenantEntity } from "../domain/multiTenantEntity.js";
import { IRepository } from "./IRepository.js";

export interface IMultiTenantRepository<TId, TUserId, TTenantId, TEntity extends MultiTenantEntity<TId, TTenantId, TUserId>> extends IRepository<TId, TEntity> {

  /**
   * Get all entities by tenant id.
   * @param tenantId 
   */
  getAllByTenantId(tenantId: TTenantId): Promise<TEntity[]>;

  /**
   * Update entity by query, must include tenant id.
   * @param query 
   * @param entity 
   */
  updateOneByQuery<TQuery extends MultiTenant<TTenantId>>(query: TQuery, entity: TEntity): Promise<boolean>;
}