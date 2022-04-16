import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityPlace } from '../models/city-place.model';
import { FilterType } from '../models/filter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class CityPlacesService {
  constructor(private http: HttpClient) {}

  getByType(type: FilterType): Observable<Array<CityPlace>> {
    return this.http.get<Array<CityPlace>>(`assets/data/${type.toString().toLowerCase()}.json`);
  }
}
