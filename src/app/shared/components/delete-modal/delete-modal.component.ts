import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() showDeleteModal: boolean | undefined;
  @Output() showDeleteModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() doDelete: boolean | undefined;
  @Output() doDeleteChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.doDelete = false;
  }

  /**
   * Hide the delete modal
   */
  hideDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
    this.showDeleteModalChange.emit(this.showDeleteModal);
  }

  /**
   * Accept the delete by clicking the delete button
   * Delete the modal
   */
  doDeleteFct(): void {
    this.doDelete = true;
    this.doDeleteChange.emit(this.doDelete);
    this.hideDeleteModal();
  }

}
