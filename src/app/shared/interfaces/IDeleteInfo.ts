/**
 * IDeleteInfo
 */
export interface IDeleteInfo {
  showDeleteModal: boolean,
  deleteId: number,
  doDelete: boolean,
}

/**
 * Get IDeleteInfo
 * @returns IDeleteInfo
 */
export function getIDeleteInfo(): IDeleteInfo {
  return {
    showDeleteModal: false,
    deleteId: 0,
    doDelete: false,
  };
}
