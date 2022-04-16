import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PlaceDetailsModalComponent } from './components/place-details-modal/place-details-modal.component';
import { PreferredLanguageModalComponent } from './components/preferred-language-modal/preferred-language-modal.component';
import { CityPlace } from './models/city-place.model';
import { FilterType } from './models/filter-type.enum';
import { MenuItem } from './models/menu-item.model';
import { CityPlacesService } from './services/city-places.service';

@Component({
  selector: 'toc-platform-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  readonly menuItems: Array<MenuItem> = [
    { title: 'FILTER_ITEMS.ACCOMODATION', type: FilterType.ACCOMODATION, icon: 'home' },
    { title: 'FILTER_ITEMS.RESTAURANTS', type: FilterType.RESTAURANTS, icon: 'fast-food' },
    { title: 'FILTER_ITEMS.CAFES', type: FilterType.CAFES, icon: 'cafe' },
    { title: 'FILTER_ITEMS.ATTRACTIONS', type: FilterType.ATRACTIONS, icon: 'bicycle' },
    { title: 'FILTER_ITEMS.TRANSPORTATION', type: FilterType.TRANSPORT, icon: 'car' },
    { title: 'FILTER_ITEMS.LOOKOUTS', type: FilterType.LOOKOUTS, src: 'mountains.svg' },
    { title: 'FILTER_ITEMS.RECREATION', type: FilterType.RECREATION, src: 'recreational-activity.svg' },
    { title: 'FILTER_ITEMS.CULTURE', type: FilterType.CULTURE, src: 'theater.svg' },
    {
      title: 'FILTER_ITEMS.PROTECTED_NATURAL_ASSETS',
      type: FilterType.PROTECTED_NATURAL_ASSETS,
      src: 'natural-goods.svg',
    },
    { title: 'FILTER_ITEMS.EVENTS', type: FilterType.EVENTS, icon: 'calendar' },
  ];
  readonly slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
  };

  cityPlaces$!: Observable<Array<CityPlace>>;
  filterType!: FilterType;
  readonly FilterType = FilterType;

  constructor(
    private cityPlacesService: CityPlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private translateService: TranslateService
  ) {}

  onFilterChange(type: FilterType): void {
    this.filterType = type;

    if (type !== FilterType.EVENTS) {
      this.cityPlaces$ = this.cityPlacesService.getByType(type);
    }
  }

  async onSelectedPlace(cityPlace: CityPlace): Promise<void> {
    const placeDetailsModal = await this.modalController.create({
      component: PlaceDetailsModalComponent,
      componentProps: {
        cityPlace,
      },
    });

    return await placeDetailsModal.present();
  }

  async openActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('SETTINGS.TITLE'),
      buttons: [
        {
          text: this.translateService.instant('SETTINGS.ITEMS.CHOOSE_LANGUAGE'),
          role: 'destructive',
          icon: 'language',
          handler: async () => {
            const preferredLanguageModal = await this.modalController.create({
              component: PreferredLanguageModalComponent,
            });

            await preferredLanguageModal.present();
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
