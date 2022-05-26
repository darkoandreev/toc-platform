import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Animation, AnimationController, IonCard } from '@ionic/angular';
import { CityPlace } from '../../models/city-place.model';

@Component({
  selector: 'toc-platform-city-places-list',
  templateUrl: './city-places-list.component.html',
  styleUrls: ['./city-places-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPlacesListComponent implements AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef }) ionCards!: QueryList<ElementRef<Element>>;

  @Input() cityPlaces!: Array<CityPlace> | null;
  @Output() selectedPlace = new EventEmitter<CityPlace>();

  selectedIndex!: number;

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit(): void {
    const animations: Array<Animation> = [];

    this.ionCards.changes.subscribe((cards: QueryList<ElementRef>) => {
      cards.forEach((card: ElementRef<Element>, index) => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .fromTo('transform', `translateX(${index * 150 + 300}px)`, 'translateX(0px)')
          .fromTo('opacity', '0.1', '1');

        animations.push(animation);
      });

      this.animationCtrl.create().duration(1000).iterations(1).addAnimation(animations).play();
    });
  }
}
