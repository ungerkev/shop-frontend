import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/interfaces/IAddress';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { getIDeleteInfo, IDeleteInfo } from "../shared/interfaces/IDeleteInfo";
import { getIEditInfo, IEditInfo } from "../shared/interfaces/IEditInfo";
import {AddressService} from "../shared/services/address.service";

@Component({
  selector: 'app-auth',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  /** Modal variables **/
  showNewAddressModal: boolean = false;
  editInfo: IEditInfo = getIEditInfo(); // For edit modal
  deleteInfo: IDeleteInfo = getIDeleteInfo(); // For delete modal
  /** **/

  userId: number = 0;
  addressListOfUser: IAddress[] = [];
  addressCountOfUser: number = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private addressService: AddressService,
              private toastrService: ToastrService) { }

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getUserId();
    this.getAddressListOfUserId(this.userId);
  }

  /**
   * User logout
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']).then();
  }

  /**
   * Get all addresses of particular user
   * @param userId number
   */
  getAddressListOfUserId(userId: number): void {
    this.addressService.getAllAddressesOfUserId(userId).then((addressesArray: any) => {
      this.addressListOfUser = addressesArray.addresses.rows;
      this.addressCountOfUser = addressesArray.addresses.count;
    }).catch((error: any) => {
      this.toastrService.error('Could not get all addresses', 'Error');
    });
  }

  /**
   * Delete a particular address by its id
   * @param id number
   */
  deleteAddress(id: number) {
    if (this.deleteInfo.doDelete) {
      this.addressService.deleteAddress(id).then(() => {
        this.getAddressListOfUserId(this.userId);
      }).catch((error) => {
        console.log(error);
      })
    }
    this.deleteInfo.doDelete = false;
  }
}



