/**
 * IEditInfo
 */
export interface IEditInfo {
  showEditModal: boolean,
  editId: number,
}

/**
 * Get IDeleteInfo
 * @returns IDeleteInfo
 */
export function getIEditInfo(): IEditInfo {
  return {
    showEditModal: false,
    editId: 0,
  };
}
