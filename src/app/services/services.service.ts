// services.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { Booking } from '../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = 'http://localhost:3000'; // Assuming your JSON server is running on this port

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hotels`);
  }

  // Define the writeData method to send data to the backend server
  writeData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bookings`, formData);
  }

 
  // getBookings(): Observable<any> {
  //   return this.http.get<any>('http://localhost:3000'); // Adjust the URL as needed
  // }

  // Method to fetch number of rooms available for a specific hotel
  getNumberOfRoomsAvailable(hotelId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/hotels/${hotelId}/rooms`);
  }

   // Define the getBookings method to fetch bookings data from the backend server
   getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  softDeleteBooking(id: number): Observable<void> {
    // Send a PATCH request to update the 'deleted' flag to true
    return this.http.patch<void>(`${this.baseUrl}/${id}`, { deleted: true });
  }
  private isLoggedIn: boolean = false;

 
  login(): void {
    // Your login logic here
    this.isLoggedIn = true;
  }

  logout(): void {
    // Your logout logic here
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
