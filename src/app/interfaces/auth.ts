export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    hasPanCard?: boolean;
}

export interface Booking {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
    arrivalDate: string;
    departureDate: string;
    numberOfPeople: number;
    numberOfRooms: number;
    deleted: boolean;
    hotelName: string;
  }