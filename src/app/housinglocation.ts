// This is an Interface (custom data types for the app)
// In this lesson, you'll create an interface to define properties that represent data about a single housing location.
export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

// At this point, you've defined an interface that represents data about a housing location
