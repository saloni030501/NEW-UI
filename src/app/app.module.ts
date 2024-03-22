import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
// import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { AboutUsComponent } from './navbar/about-us/about-us.component';
import { ContactsComponent } from './navbar/contacts/contacts.component';
import { SearchComponent } from './navbar/search/search.component';
import { LoginComponent } from './navbar/login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookHotelComponent } from './navbar/book-hotel/book-hotel.component';
import { FooterComponent } from './footer/footer.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RatingsComponent } from './ratings/ratings.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactsComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    BookHotelComponent,
    FooterComponent,
    BookingFormComponent,
    ReviewsComponent,
    RatingsComponent,
    BookingListComponent,
    CarouselComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    // ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
