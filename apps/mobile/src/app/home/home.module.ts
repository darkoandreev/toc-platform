import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CityPlacesFilterComponent } from './components/city-places-filter/city-places-filter.component';
import { RouterModule } from '@angular/router';
import { CityPlacesListComponent } from './components/city-places-list/city-places-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlaceDetailsModalComponent } from './components/place-details-modal/place-details-modal.component';
import { PreferredLanguageModalComponent } from './components/preferred-language-modal/preferred-language-modal.component';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationService } from './services/location.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, RouterModule, TranslateModule],
  declarations: [
    HomePage,
    CityPlacesFilterComponent,
    CityPlacesListComponent,
    PlaceDetailsModalComponent,
    PreferredLanguageModalComponent,
    EventsCalendarComponent,
  ],
  providers: [LocationService, LocationAccuracy, AndroidPermissions],
})
export class HomePageModule {}
