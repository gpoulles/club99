import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calculation } from '../interfaces/calculation.interface';

@Injectable({
  providedIn: 'root',
})
export class NinetyNineClubServiceService {
  constructor(private http: HttpClient) {}

  loadData(x: number): Observable<Calculation[]> {
    const jsonFilePath = './../assets/club-' + x.toString() + '.json';
    return this.http.get<Calculation[]>(jsonFilePath);
  }
}
