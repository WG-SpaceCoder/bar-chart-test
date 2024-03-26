import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private dataSubject: BehaviorSubject<SearchResult[]>;
  public data$: Observable<SearchResult[]>;
  private monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  constructor(private http: HttpClient) { 
    this.dataSubject = new BehaviorSubject<SearchResult[]>([]);
    this.data$ = this.dataSubject.asObservable();
  }

  getData(): SearchResult[] {
    return this.dataSubject.value;
  }

  getNewData() {
    const url = 'https://dsg-api-test.k2-app.com/ats/search/all';
    this.http.get<{count:number; searches:SearchResult[]}>(url).subscribe((result) => {
      // console.log('result', result);
      this.dataSubject.next(result.searches);
    })
  }

  getMonthName(month: number) {
    return this.monthNames[month];
  }
}
