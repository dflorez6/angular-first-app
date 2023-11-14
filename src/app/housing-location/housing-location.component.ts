import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Routing
import { RouterLink, RouterOutlet } from '@angular/router'; // RouterModule
// Custom Interfaces
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    // TODO: Needed to enable Routing
    // RouterModule
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <!-- 
        TODO: Routing: The routerLink directive enables Angular's router to create dynamic links in the application. 
        The value assigned to the routerLink is an array with two entries: the static portion of the path and the dynamic data.
      -->
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  // The ! is called the non-null assertion operator and it tells the TypeScript compiler that the value
  // of this property won't be null or undefined.
  @Input() housingLocation!: HousingLocation; // Property called housingLocation of type HousingLocation
}
