import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { CityPlace } from '../../models/city-place.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'toc-platform-place-details-modal',
  templateUrl: './place-details-modal.component.html',
  styleUrls: ['./place-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailsModalComponent {
  @ViewChild(IonContent) ionContent!: IonContent;

  @Input() cityPlace!: CityPlace;

  @HostBinding('style.background')
  get backgroundImage(): string {
    return `url('${this.cityPlace.image}') 0 0/100% 30% no-repeat`;
  }

  addNoTransformClass = false;

  constructor(public modalController: ModalController, private locationService: LocationService) {}

  async onScroll(): Promise<void> {
    const scrollElement = await this.ionContent.getScrollElement();
    this.addNoTransformClass = scrollElement.scrollTop >= scrollElement.clientHeight + 200;
  }

  async navigate(): Promise<void> {
    const isLocationEnabled = await this.locationService.checkPermissions();

    if (isLocationEnabled) {
      window.open('https://www.google.com/maps/dir/?api=1&destination=Pirot,Serbia&travelMode=driving');
    }
  }
}
