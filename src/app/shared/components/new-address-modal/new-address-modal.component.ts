import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidateZipCode } from "../../validators/validators";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { IAddress } from "../../interfaces/IAddress";

const countryCodes: any = require('country-codes-list');

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.scss']
})
export class NewAddressModalComponent implements OnInit {
  @Input() showAddressModal: boolean | undefined;
  @Output() showAddressModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() addressListOfUser: IAddress[] | undefined;
  @Output() addressListOfUserChange: EventEmitter<IAddress[]> = new EventEmitter<IAddress[]>();

  @Input() addressCountOfUser: number = 0;
  @Output() addressCountOfUserChange: EventEmitter<number> = new EventEmitter<number>();

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

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getUserId();
    this.countryCodeList = this.getCountryCodeList();
  }

  /**
   * Hide new address modal
   */
  hideNewAddressModal(): void {
    this.showAddressModal = !this.showAddressModal;
    this.showAddressModalChange.emit(this.showAddressModal);
  }

  /**
   * Update parent component
   * @param newAddress IAddress
   */
  updateAddressList(newAddress: IAddress): void {
    if (this.addressListOfUser) {
      this.addressListOfUser.push(newAddress);
    }
    this.addressListOfUserChange.emit(this.addressListOfUser);
    this.addressCountOfUserChange.emit(this.addressCountOfUser);
  }

  /**
   * save new address in DB
   */
  saveNewAddress(): void {
    if (this.newAddressForm.valid) {
      this.userService.saveAddress(this.newAddressForm.value, this.userId).then(() => {
        this.hideNewAddressModal();
        this.updateAddressList(this.newAddressForm.value);
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

