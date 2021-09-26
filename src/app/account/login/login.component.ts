import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
  }

  login(): void {
    if (this.loginForm.value.email === '' && this.loginForm.value.password === '') {
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
      this.router.navigate(['/account']).then();
    }).catch((err) => {
      console.log('login error');
      console.log(err);
    });
  }

  /*************************************
   * Login validators
   *************************************/

  /**
   * Validate required email address
   * @returns boolean
   */
  validateEmailRequired(): boolean {
    return !!(this.loginForm.get('email')?.touched
      && this.loginForm.get('email')?.errors?.required);
  }

  /**
   * Validate if email is well formed
   * @returns boolean
   */
  validateEmailWellFormed(): boolean {
    return !!(this.loginForm.get('email')?.dirty
      && !this.loginForm.get('email')?.errors?.required
      && this.loginForm.get('email')?.errors?.email);
  }

  /**
   * Validate required password
   * @returns boolean
   */
  validatePasswordRequired(): boolean {
    return !!(this.loginForm.get('password')?.touched
      && this.loginForm.get('password')?.errors?.required);
  }
}
