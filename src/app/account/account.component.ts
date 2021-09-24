import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from 'src/app/shared/interfaces/IAddress';
import { getIUser, IUser } from 'src/app/shared/interfaces/IUser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: IUser = getIUser();
  showAddressModal: boolean = false;
  addressListOfUser: IAddress[] = [];
  addressCountOfUser: number = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private toastrService: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await this.setUser();
    this.getAddressListOfUserId(this.user.id);
  }

  /**
   * User logout
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']).then();
  }

  /**
   * Get user information out of local storage and the userId stored in the token and set the user variable
   */
  async setUser(): Promise<void> {
    this.user = this.userService.getUserFromLocalStorage();
    this.user.id = await this.userService.getUserIdOfToken();
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
}



