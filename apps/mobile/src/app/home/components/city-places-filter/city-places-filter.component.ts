import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterType } from '../../models/filter-type.enum';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'toc-platform-city-places-filter',
  templateUrl: './city-places-filter.component.html',
  styleUrls: ['./city-places-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPlacesFilterComponent implements OnInit {
  @Input() menuItems!: Array<MenuItem>;
  @Output() filterChange = new EventEmitter<FilterType>();

  selectedIndex = 0;

  ngOnInit(): void {
    this.filterChange.emit(FilterType.ACCOMODATION);
  }
}
