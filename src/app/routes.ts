import { Routes } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
  // Root ('/')
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  // Details ('/details/:id')
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  // More routes...
];

export default routeConfig;
