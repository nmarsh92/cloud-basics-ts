import { FilterQuery, Model, ObjectId } from "mongoose";
import { Page } from "../../../domain/src/page.js";
import { PagedQuery } from "../../../domain/src/pagedQuery.js";
import { IRepository } from "../interfaces/IRepository.js";
import { MultiTenantEntity } from "../../../domain/src/multiTenantEntity.js";

/** @inheritdoc */
export abstract class MultiTenantMongoBaseRepository<TEntity extends MultiTenantEntity<ObjectId, string, string>> implements IRepository<ObjectId, TEntity> {
  protected model: Model<TEntity>

  protected constructor(model: Model<TEntity>) {
    this.model = model;
  }

  /**
   * @inheritdoc
   */
  public async getAll(query?: FilterQuery<TEntity> | null | undefined): Promise<TEntity[]> {
    return this.model.find(query || {});
  }

  public async getAllForTenant(tenantId: string, query?: FilterQuery<TEntity> | null) {
    return this.model.find({ tenantId, ...query });
  }

  /** @inheritdoc */
  public async getOneById(id: ObjectId): Promise<TEntity | null> {
    return this.model.findById(id);
  }

  /** @inheritdoc */
  public add(entity: Omit<Omit<TEntity, "createdAt" | "updatedAt" | "version" | "isDeleted">, "id">): Promise<TEntity> {
    return this.model.create(entity);
  }

  /** @inheritdoc */
  public async updateOneById(id: ObjectId, entity: TEntity): Promise<boolean> {
    const results = await this.model.updateOne({ _id: id }, entity);
    return results.modifiedCount === 1;
  }

  /** @inheritdoc */
  public async updateOneByQuery(query: FilterQuery<TEntity>, entity: TEntity): Promise<boolean> {
    this.ensureTenantId(query);
    const results = await this.model.updateOne(query, entity);
    return results.modifiedCount === 1;
  }

  /** @inheritdoc */
  public async updateManyByQuery(query: FilterQuery<TEntity>, entity: TEntity): Promise<number> {
    this.ensureTenantId(query);
    const results = await this.model.updateMany(query, entity);
    return results.modifiedCount;
  }

  /** @inheritdoc */
  public async deleteOneById(id: ObjectId): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  /** @inheritdoc */
  public async deleteManyByQuery(query: FilterQuery<TEntity>): Promise<void> {
    this.ensureTenantId(query);
    await this.model.deleteMany(query);
  }

  /** @inheritdoc */
  public async find(filter: PagedQuery<FilterQuery<TEntity>>): Promise<Page<TEntity>> {
    const { query } = filter;
    this.ensureTenantId(query);
    const results = await this.model.find({
      ...query,
      tenantId: query.tenantId
    })
      .skip(filter.pageSize * (filter.page - 1))
      .limit(filter.pageSize);
    const total = await this.model.countDocuments(query);
    return {
      data: results,
      total,
      page: filter.page,
      pageSize: filter.pageSize
    };
  }

  /** @inheritdoc */
  public count(filter: FilterQuery<TEntity>): Promise<number> {
    this.ensureTenantId(filter);
    return this.model.countDocuments(filter);
  }

  private ensureTenantId(entity: TEntity | FilterQuery<TEntity>): void {
    if (!entity.tenantId) {
      throw new Error("TenantId is required.");
    }
  }
}