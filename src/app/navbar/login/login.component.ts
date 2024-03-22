import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: ServicesService,
    private router: Router
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);

          // Display success notification upon successful login
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back!',
            confirmButtonText: 'Continue'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to home page after clicking "Continue"
              this.router.navigate(['/home']);
            }
          });
        } else {
          // Display error notification if email or password is wrong
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Email or password is wrong',
            confirmButtonText: 'OK'
          });
        }
      },
      error => {
        // Display error notification if something goes wrong
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  }
