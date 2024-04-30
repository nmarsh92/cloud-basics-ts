/**
 * Interface for auditable entities.
 */
export interface Auditable<TUserId> {
  /**
   * Created at.
   */
  createdAt: Date;

  /**
   * Updated at.
   */
  updatedAt: Date;

  /**
   * Created by.
   */
  createdBy: TUserId;

  /**
   * Updated by.
   */
  updatedBy: TUserId;

  /**
   * Version.
   */
  version: number;

  /**
   * Is deleted.
   */
  isDeleted: boolean;
}