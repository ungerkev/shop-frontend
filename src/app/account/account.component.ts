import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IAddress} from 'src/app/shared/interfaces/IAddress';
import {getIUser, IUser} from 'src/app/shared/interfaces/IUser';
import {AuthService} from 'src/app/shared/services/auth.service';
import {UserService} from 'src/app/shared/services/user.service';
import {ValidateZipCode} from 'src/app/shared/validators/validators';

const countryCodes: any = require('country-codes-list');

@Component({
  selector: 'app-auth',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: IUser = getIUser();
  showAddressModal: boolean = false;
  countryCodeList: any; // TODO: check which type
  addressListOfUser: IAddress[] = [];
  addressCountOfUser: number = 0;

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
              private userService: UserService,
              private toastrService: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await this.setUser();
    this.countryCodeList = this.getCountryCodeList();
    this.getAddressListOfUserId(this.user.id);
  }

  /**
   * User logout
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Get user information out of local storage and the userId stored in the token and set the user variable
   */
  async setUser(): Promise<void> {
    this.user = this.userService.getUserFromLocalStorage();
    this.user.id = await this.userService.getUserIdOfToken();
  }

  /**
   * save new address in DB
   */
  saveNewAddress(): void {
    if (this.newAddressForm.valid) {
      this.userService.saveAddress(this.newAddressForm.value, this.user.id).then(() => {
        this.getAddressListOfUserId(this.user.id);
        this.showAddressModal = false;
        this.toastrService.success('Saved new address', 'Success');
      }).catch((error: any) => {
        this.toastrService.error('Could not save new address', 'Error');
      });
    }
  }

  /**
   * Get all addresses of particular user
   * @param userId number
   */
   getAddressListOfUserId(userId: number): void {
    this.userService.getAllAddressesOfUserId(userId).then((addressesArray: any) => {
      this.addressListOfUser = addressesArray.addresses.rows;
      this.addressCountOfUser = addressesArray.addresses.count;
    }).catch((error: any) => {
      this.toastrService.error('Could not get all addresses', 'Error');
    });
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
  validateIsZipCodeSet(): boolean {
    return !!(this.newAddressForm.get('zipCode')?.touched
      && this.newAddressForm.get('zipCode')?.errors?.required);
  }

  /**
   * Validate zipCode per country code
   * @returns boolean
   */
  validateZipCode(): boolean {
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
  validateIsCountrySet(): boolean {
    return !!(this.newAddressForm.get('country')?.dirty
      && this.newAddressForm.get('country')?.errors?.required);
  }

  /**
   * Validate required city
   * @returns boolean
   */
  validateIsCitySet(): boolean {
    return !!(this.newAddressForm.get('city')?.touched
      && this.newAddressForm.get('city')?.errors?.required);
  }

  /**
   * Validate required address1
   * @returns boolean
   */
  validateIsAddress1Set(): boolean {
    return !!(this.newAddressForm.get('address1')?.touched
      && this.newAddressForm.get('address1')?.errors?.required);
  }

  /**
   * Validate required phone number
   * @returns boolean
   */
  validateIsPhoneSet(): boolean {
    return !!(this.newAddressForm.get('phone')?.touched
      && this.newAddressForm.get('phone')?.errors?.required);
  }

  /**
   * Validate required last name
   * @returns boolean
   */
  validateIsLastNameSet(): boolean {
    return !!(this.newAddressForm.get('lastName')?.touched
      && this.newAddressForm.get('lastName')?.errors?.required);
  }

  /**
   * Validate required first name
   * @returns boolean
   */
  validateIsFirstNameSet(): boolean {
    return !!(this.newAddressForm.get('firstName')?.touched
      && this.newAddressForm.get('firstName')?.errors?.required);
  }
}
