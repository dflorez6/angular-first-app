import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Routing
import { ActivatedRoute } from '@angular/router';
// Angular Forms
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// Services
import { HousingService } from '../housing.service';
// Interfaces
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    // Angular Forms
    ReactiveFormsModule,
  ],
  template: `
    <article>
      <!-- 
      Notice that the housingLocation properties are being accessed with the optional chaining operator ?. 
      This ensures that if the housingLocation value is null or undefined the application doesn't crash. 
      -->
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <!-- TODO: The template now includes an event handler (submit)="submitApplication()" -->
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  // This code gives the DetailsComponent access to the ActivatedRoute router feature that
  // enables you to have access to the data about the current route
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  // Object to represent data from an Angular Form (FormGroup & FormControl are Types that enable form building)
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  // First example: static data from this Service
  /*
  // The constructor now includes a call to the HousingService to pass the route parameter as
  // an argument to the getHousingLocationById service function.
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }
  */

  // Next example: uses db.json to emulate a DB with an HTTP request/response (GET request)
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  // Handles the Apply now click (form submission)
  // This code uses the "??"" nullish coalescing operator to default to empty string if the value is null
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
