import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  bookings: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initBookingForm();
    this.fetchBookings();
  }

  initBookingForm(): void {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      numberOfPeople: ['', Validators.required],
      numberOfRooms: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.bookingForm.valid) {
      // Send data to backend server for writing to JSON file
      this.bookingService.writeData(this.bookingForm.value).subscribe(
        (response: any) => { // Specify the type of 'response'
          console.log('Data written successfully:', response);
          // Optionally, reset the form after successful submission
          this.bookingForm.reset();
          // Refresh bookings data after successful submission
          this.fetchBookings();
        // Display SweetAlert for booking confirmation
        Swal.fire({
          title: 'Booking Confirmed!',
          text: 'Your booking has been confirmed.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to past booking component
            this.router.navigate(['/past-bookings']);
          }
        });
        // Refresh bookings data after successful submission
        this.fetchBookings();
      },
      (error: any) => { // Specify the type of 'error'
        console.error('Error writing data:', error);
        // Handle error
      }
    );
  }
}

fetchBookings(): void {
  this.bookingService.getBookings().subscribe((data: any) => { // Type assertion to 'any'
    if (data && data.bookings) {
      this.bookings = data.bookings;
    }
  });
}
}
