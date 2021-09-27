import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidateZipCode } from "../../validators/validators";
import { UserService } from "../../services/user.service";
import { IAddress } from "../../interfaces/IAddress";
import { AddressService } from "../../services/address.service";

const countryCodes: any = require('country-codes-list');

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})
export class NewAddressModalComponent implements OnInit {
  @Input() showNewAddressModal: boolean | undefined;
  @Output() showNewAddressModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** We need the addressListOfUser from the "parent-component" because of some validation **/
  @Input() addressListOfUser: IAddress[] | undefined;
  @Output() addressListOfUserChange: EventEmitter<IAddress[]> = new EventEmitter<IAddress[]>();

  userId: number = 0;
  countryCodeList: any; // TODO: check which type
  newAddressForm: FormGroup = new FormGroup({
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

  constructor(private addressService: AddressService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getUserId();
    this.countryCodeList = this.getCountryCodeList();

    if (!this.addressListOfUser || this.addressListOfUser.length === 0) {
      this.newAddressForm.get('isDefault')?.setValue(true);
      this.newAddressForm.get('isDefault')?.disable();
    }
  }

  /**
   * Hide new address modal
   */
  hideNewAddressModal(): void {
    this.showNewAddressModal = !this.showNewAddressModal;
    this.showNewAddressModalChange.emit(this.showNewAddressModal);
  }

  /**
   * save new address in DB
   */
  saveNewAddress(): void {
    if (this.newAddressForm.valid) {
      this.addressService.saveAddress(this.newAddressForm.value, this.userId).then(() => {
        this.hideNewAddressModal();
      }).catch((error: any) => {
        console.log(error);
      });
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
    return !!(this.newAddressForm.get('zipCode')?.touched
      && this.newAddressForm.get('zipCode')?.errors?.required);
  }

  /**
   * Validate zipCode per country code
   * @returns boolean
   */
  validateZipCodePerCountryCode(): boolean {
    if (this.newAddressForm.get('country')?.invalid) {
      this.newAddressForm.get('zipCode')?.disable();
    } else {
      this.newAddressForm.get('zipCode')?.enable();
    }

    return !!(this.newAddressForm.get('zipCode')?.dirty
      && !this.newAddressForm.get('zipCode')?.errors?.required
      && this.newAddressForm.get('zipCode')?.errors?.invalidZipCode);
  }

  /**
   * Validate required country
   * @returns boolean
   */
  validateCountryRequired(): boolean {
    return !!(this.newAddressForm.get('country')?.dirty
      && this.newAddressForm.get('country')?.errors?.required);
  }

  /**
   * Validate required city
   * @returns boolean
   */
  validateCityRequired(): boolean {
    return !!(this.newAddressForm.get('city')?.touched
      && this.newAddressForm.get('city')?.errors?.required);
  }

  /**
   * Validate required address1
   * @returns boolean
   */
  validateAddress1Required(): boolean {
    return !!(this.newAddressForm.get('address1')?.touched
      && this.newAddressForm.get('address1')?.errors?.required);
  }

  /**
   * Validate required phone number
   * @returns boolean
   */
  validatePhoneRequired(): boolean {
    return !!(this.newAddressForm.get('phone')?.touched
      && this.newAddressForm.get('phone')?.errors?.required);
  }

  /**
   * Validate required last name
   * @returns boolean
   */
  validateLastNameRequired(): boolean {
    return !!(this.newAddressForm.get('lastName')?.touched
      && this.newAddressForm.get('lastName')?.errors?.required);
  }

  /**
   * Validate required first name
   * @returns boolean
   */
  validateFirstNameRequired(): boolean {
    return !!(this.newAddressForm.get('firstName')?.touched
      && this.newAddressForm.get('firstName')?.errors?.required);
  }
}

