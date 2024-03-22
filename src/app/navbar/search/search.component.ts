import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  hotels: any[] = []; // Define an array to hold hotel data
  filteredHotels: any[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    // Fetch hotels data when component initializes
    this.fetchHotels();
  }

  // Method to fetch hotels data from the service
  fetchHotels(): void {
    this.servicesService.getHotels().subscribe(data => {
      this.hotels = data; // Assign fetched data to hotels array
      // Generate random ratings for each hotel
      this.hotels.forEach(hotel => {
        hotel.rating = this.generateRandomRating();
        this.servicesService.getNumberOfRoomsAvailable(hotel.id).subscribe(rooms => {
          hotel.availableRooms = rooms; // Assign number of rooms available to the hotel object
        });
      });
    });
  }

  search() {
    if (!this.searchText) {
      this.filteredHotels = []; // Reset filtered hotels if search text is empty
      return;
    }
    // Filter hotels based on search text
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.city.toLowerCase().includes(this.searchText.toLowerCase()) ||
      hotel.area.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

   

    // Method to generate a random rating between 3.0 and 5.0
    generateRandomRating(): number {
      return Math.floor(Math.random() * (5 - 3.0 + 1)) + 3.0;
    }

    getStarArray(rating: number): number[] {
      const starsCount = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      return Array.from({ length: starsCount }).map((_, index) => index + 1).concat(halfStar ? [0.5] : []);
    }

  selectHotel(hotel: any) {
    // Handle hotel selection, e.g., navigate to booking page
    console.log('Selected hotel:', hotel);
  }

  toggleBookingForm(hotel: any) {
    // Toggle booking form visibility
    hotel.showBookingForm = !hotel.showBookingForm;
  }

  // confirmBooking(hotel: any) {
  //   // Handle booking confirmation
  //   console.log('Confirmed booking for hotel:', hotel);
  // }
}


