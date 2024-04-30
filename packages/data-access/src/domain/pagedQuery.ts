export interface PagedQuery<TQuery> {
  page: number;
  pageSize: number;
  query: TQuery;
}