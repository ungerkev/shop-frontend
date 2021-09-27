import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidateZipCode } from "../../validators/validators";
import { UserService } from "../../services/user.service";
import { IAddress } from "../../interfaces/IAddress";
import { AddressService } from "../../services/address.service";

const countryCodes: any = require('country-codes-list');

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.scss']
})
export class EditAddressModalComponent implements OnInit {
  @Input() showEditModal: boolean | undefined;
  @Output() showEditModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() editId: number | undefined;
  @Output() editIdChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** We need the addressListOfUser from the "parent-component" because of some validation **/
  @Input() addressListOfUser: IAddress[] | undefined;
  @Output() addressListOfUserChange: EventEmitter<IAddress[]> = new EventEmitter<IAddress[]>();

  userId: number = 0;
  countryCodeList: any; // TODO: check which type
  editAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    company: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, ValidateZipCode]),
    isDefault: new FormControl(false)
  });

  constructor(private userService: UserService,
              private addressService: AddressService) { }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getUserId();
    this.countryCodeList = this.getCountryCodeList();
    await this.setAddressForm();

    if (!this.addressListOfUser || this.addressListOfUser.length === 1) {
      this.editAddressForm.get('isDefault')?.disable();
    }
  }

  async setAddressForm(): Promise<void> {
    const address = await this.getAddressOfId(this.editId);
    this.editAddressForm.get('firstName')?.setValue(address.address.firstName);
    this.editAddressForm.get('lastName')?.setValue(address.address.lastName);
    this.editAddressForm.get('company')?.setValue(address.address.company);
    this.editAddressForm.get('phone')?.setValue(address.address.phone);
    this.editAddressForm.get('address1')?.setValue(address.address.address1);
    this.editAddressForm.get('address2')?.setValue(address.address.address2);
    this.editAddressForm.get('city')?.setValue(address.address.city);
    this.editAddressForm.get('country')?.setValue(address.address.country);
    this.editAddressForm.get('zipCode')?.setValue(address.address.zipCode);
    this.editAddressForm.get('isDefault')?.setValue(address.address.isDefault);
  }

  /**
   * Get address of specific id
   * @param id number
   */
  async getAddressOfId(id: number | undefined): Promise<any> {
    if (!id) { return; }
    return this.addressService.getAddress(id);
  }


  /**
   * Hide the edit modal
   */
  hideEditAddressModal(): void {
    this.showEditModal = !this.showEditModal;
    this.showEditModalChange.emit(this.showEditModal);
  }

  /**
   * Accept the delete by clicking the delete button
   * Delete the modal
   */
  async editAddressFct(): Promise<void> {
    if (this.editAddressForm.valid && this.editId && this.userId) {
      await this.addressService.editAddress(this.editId, this.userId, this.editAddressForm.value);
      this.hideEditAddressModal();
    }

  }

  /**
   * Get all countries as a list
   * @returns country list
   */
  getCountryCodeList(): any {
    return countryCodes.customList('countryNameEn', '{countryCode}');
  }

  /*************************************
   * New address modal input validators
   *************************************/

  /**
   * Validate required zipCode
   * @returns boolean
   */
  validateZipCodeRequired(): boolean {
    return !!(this.editAddressForm.get('zipCode')?.touched
      && this.editAddressForm.get('zipCode')?.errors?.required);
  }

  /**
   * Validate zipCode per country code
   * @returns boolean
   */
  validateZipCodePerCountryCode(): boolean {
    if (this.editAddressForm.get('country')?.invalid) {
      this.editAddressForm.get('zipCode')?.disable();
    } else {
      this.editAddressForm.get('zipCode')?.enable();
    }

    return !!(this.editAddressForm.get('zipCode')?.dirty
      && !this.editAddressForm.get('zipCode')?.errors?.required
      && this.editAddressForm.get('zipCode')?.errors?.invalidZipCode);
  }

  /**
   * Validate required country
   * @returns boolean
   */
  validateCountryRequired(): boolean {
    return !!(this.editAddressForm.get('country')?.dirty
      && this.editAddressForm.get('country')?.errors?.required);
  }

  /**
   * Validate required city
   * @returns boolean
   */
  validateCityRequired(): boolean {
    return !!(this.editAddressForm.get('city')?.touched
      && this.editAddressForm.get('city')?.errors?.required);
  }

  /**
   * Validate required address1
   * @returns boolean
   */
  validateAddress1Required(): boolean {
    return !!(this.editAddressForm.get('address1')?.touched
      && this.editAddressForm.get('address1')?.errors?.required);
  }

  /**
   * Validate required phone number
   * @returns boolean
   */
  validatePhoneRequired(): boolean {
    return !!(this.editAddressForm.get('phone')?.touched
      && this.editAddressForm.get('phone')?.errors?.required);
  }

  /**
   * Validate required last name
   * @returns boolean
   */
  validateLastNameRequired(): boolean {
    return !!(this.editAddressForm.get('lastName')?.touched
      && this.editAddressForm.get('lastName')?.errors?.required);
  }

  /**
   * Validate required first name
   * @returns boolean
   */
  validateFirstNameRequired(): boolean {
    return !!(this.editAddressForm.get('firstName')?.touched
      && this.editAddressForm.get('firstName')?.errors?.required);
  }

}
