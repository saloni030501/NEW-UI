import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/auth';
import { ServicesService } from '../services/services.service';
import { passwordMatchValidator } from '../shared/password-match.directive';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  successMessage: string = '';
  errorMessage: string = '';
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    hasPanCard: [''] ,// Add radio button control
    
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: ServicesService,
    private router: Router
  ) { }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  submitDetails() {
    // Check if the form is valid
    if (this.registerForm.valid) {
      // Check if the user has selected "Yes" for PAN card
      if (this.registerForm.get('hasPanCard')?.value === 'yes') {
        const postData = { ...this.registerForm.value };
        delete postData.confirmPassword;
        delete postData.hasPanCard; // Exclude hasPanCard from form data
        this.authService.registerUser(postData as User).subscribe(
          response => {
            console.log(response);
            this.successMessage = 'Registered successfully';
            // Show success alert
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Your registration has been submitted for approval.',
              confirmButtonText: 'OK'
            }).then((result) => {
              // Redirect to login page after user confirms the alert
              if (result.isConfirmed) {
                this.router.navigate(['login']);
              }
            });
          },
          error => {
            this.errorMessage = 'Something went wrong';
            // Show error alert
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        // Display message indicating PAN card information is required
        this.errorMessage = 'Please provide PAN card information to get registered';
      }
    } else {
      // Show validation error alert
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly.',
        confirmButtonText: 'OK'
      });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }


}