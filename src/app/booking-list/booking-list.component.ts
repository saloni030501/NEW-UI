import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Booking } from '../interfaces/auth';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {
  
  activeBookings: Booking[] = [];
  deletedBookings: Booking[] = [];
  completedBookings: Booking[] = [];
  selectedFilter: string = 'active'; // Default to Active Bookings

  constructor(private bookingService: ServicesService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getBookings().subscribe((bookings: Booking[]) => {
      const today = new Date(); // Current date

      this.activeBookings = bookings.filter(booking => !booking.deleted && new Date(booking.departureDate) > today);
      this.completedBookings = bookings.filter(booking => !booking.deleted && new Date(booking.departureDate) <= today);
      this.deletedBookings = bookings.filter(booking => booking.deleted);
    });
  }

  filterBookings(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedFilter = target.value;
  }
  

  softDeleteBooking(id: number): void {
    this.bookingService.softDeleteBooking(id).subscribe(() => {
      this.activeBookings = this.activeBookings.filter(booking => booking.id !== id);
      const deletedBooking = this.completedBookings.find(booking => booking.id === id);
      if (deletedBooking) {
        this.completedBookings = this.completedBookings.filter(booking => booking.id !== id);
        this.deletedBookings.push(deletedBooking);
      }
    });
  }
}
