import { FilterType } from './filter-type.enum';

export interface MenuItem {
  title: string;
  type: FilterType;
  icon?: string;
  src?: string;
}
