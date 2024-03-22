import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navbar/home/home.component';
import { AboutUsComponent } from './navbar/about-us/about-us.component';
import { BookHotelComponent } from './navbar/book-hotel/book-hotel.component';
import { ContactsComponent } from './navbar/contacts/contacts.component';
import { SearchComponent } from './navbar/search/search.component';
import { LoginComponent } from './navbar/login/login.component';
import { RegisterComponent } from './register/register.component';
// import { authGuard } from './guards/auth.guard';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RatingsComponent } from './ratings/ratings.component';
import { BookingListComponent } from './booking-list/booking-list.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component:HomeComponent},
{path:'about-us',component:AboutUsComponent},
{path:'book-hotel',component:BookHotelComponent},
{ path: 'booking-form/:hotelId', component: BookingFormComponent},
{path: 'contacts', component: ContactsComponent},
{path:'search',component:SearchComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'booking-list', component: BookingListComponent},
{path: 'reviews', component: ReviewsComponent},
{path: 'ratings', component: RatingsComponent}
];

// , canActivate: [authGuard] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
