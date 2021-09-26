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
    // check if email and password is filled in form
    if (this.loginForm.value.email !== '' && this.loginForm.value.password !== '') {
      // do the login
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
        this.router.navigate(['/account']);
      }).catch((err) => {
        console.log('login error');
        console.log(err);
      });
    }

    // const test = JSON.parse(localStorage.getItem('user') || '');
    // console.log(test);
  }


}
