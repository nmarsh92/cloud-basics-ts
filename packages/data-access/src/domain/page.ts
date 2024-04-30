/**
 * Page.
 */
export interface Page<TEntity> {
  /**
   * Entities.
   */
  data: TEntity[];

  /**
   * Total number of entities.
   */
  total: number;

  /**
   * Current page.
   */
  page: number;

  /**
   * Page size.
   */
  pageSize: number;
}