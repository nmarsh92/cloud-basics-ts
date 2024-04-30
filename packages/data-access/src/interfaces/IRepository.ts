import { Entity } from "../domain/entity.js";
import { Page } from "../domain/page.js";
import { PagedQuery } from "../domain/pagedQuery.js";

/**
 * Repository interface.
 */
export interface IRepository<TId, TEntity extends Entity<TId>> {
  /**
   * Get all entities. 
   * @param query Query.
   * @returns Entities.
   * If query is null, return all entities.
   */
  getAll(query?: Record<string, any> | null): Promise<TEntity[]>;

  /**
   * Get entity by id.
   * @param id Entity id.
   */
  getOneById(id: TId): Promise<TEntity | null>;

  /**
   * Add entity.
   * @param entity Entity.
   */
  add(entity: Omit<TEntity, "id">): Promise<TEntity>;

  /**
   * Update entity.
   * @param entity Entity.
   * @returns
   * true if the entity was updated, false if not found.
   */
  updateOneById(id: TId, entity: TEntity): Promise<boolean>;

  /**
   *  Update entity by query.
   * @param query 
   * @param entity 
   * @returns
   * true if the entity was updated, false if not found.
   */
  updateOneByQuery(query: Record<string, any>, entity: TEntity): Promise<boolean>;

  /**
   * Update many entities by query.
   * @param query 
   * @param entity 
   * @returns
   * Number of entities updated.
   */
  updateManyByQuery(query: Record<string, any>, entity: TEntity): Promise<number>;

  /**
   * Delete entity.
   * @param id Entity id.
   */
  deleteOneById(id: TId): Promise<void>;

  /**
   *  Delete entity by query.
   * @param query 
   */
  deleteManyByQuery(query: Record<string, any>): Promise<void>;

  /**
   *  Return a paged list of entities.
   * @param filter 
   */
  find(filter: PagedQuery<Record<string, any>>): Promise<Page<TEntity>>;

  /**
   * Count entities.
   * @param filter 
   */
  count(filter: Record<string, any>): Promise<number>;

}