import { Component, inject } from '@angular/core'; // inject: inject Angulat services into a component
import { CommonModule } from '@angular/common';
// Custom Components
import { HousingLocationComponent } from '../housing-location/housing-location.component';
// Custom Interfaces
import { HousingLocation } from '../housinglocation';
// Custom Services
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <!-- This example uses a template reference variable to get access to the input element as its value. -->
        <input type="text" placeholder="Filter by city" #filter />
        <!-- 
          The argument to the function is the value property of the filter template variable. Specifically, 
          the .value property from the input HTML element. 
        -->
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <!-- In angular, to add a property binding to a component tag: [attribute] = "value" -->
      <!-- The assigned value should be treated as a property from the component class and not a string value -->
      <!-- The housingLocation value now refers to the variable used in the ngFor directive -->
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // This step injects the new service into your app's HomeComponent so that it can read the app's data from a service.
  housingService: HousingService = inject(HousingService);

  // Props
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  // First example: static data from this Service
  /*
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    // The filteredLocationList should contain the total set of housing locations values by default when the page loads
    this.filteredLocationList = this.housingLocationList;
  }
  */

  // Next example: uses db.json to emulate a DB with an HTTP request/response (GET request)
  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  // Methods
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
