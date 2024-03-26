import { Component, EventEmitter, Output } from '@angular/core';
import { SearchResult } from '../search-result';
import { Observable } from 'rxjs';
import { ChartDataService } from '../chart-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @Output() monthClickEvent = new EventEmitter<number>();
  items$: Observable<SearchResult[]>;
  months: string[] = [];
  dataByMonth: any;
  chart: any;
  topHeight: number = 0;
  selectedMonth: string | undefined;

  constructor(private chartData: ChartDataService) {
    this.items$ = this.chartData.data$;
  }

  ngOnInit(): void {
    this.chartData.data$.subscribe((data) => {
      this.setDataByMonth(data);
      
    });
  }

  monthClicked(month: string) {
    // console.log('Month Clicked:', month);
    this.selectedMonth = month;
    this.monthClickEvent.emit(parseInt(month));
  }

  getMonthName(month: string) {
    return this.chartData.getMonthName(parseInt(month));
  }

  setDataByMonth(data: SearchResult[]): void {
    this.dataByMonth = {};
    data.forEach((jd) => {
      // console.log('jd', jd);
      let month = (new Date(jd.websiteDatePublished)).getMonth();
      // console.log('month', month)
      if (!this.dataByMonth[month]) {
        this.dataByMonth[month] = [jd];
      } else {
        this.dataByMonth[month].push(jd);
      }
    });
    this.months = Object.keys(this.dataByMonth).sort((a,b) => parseInt(a)-parseInt(b));
    this.months.forEach((month) => {
      if (this.dataByMonth[month].length > this.topHeight) {
        this.topHeight = this.dataByMonth[month].length;
      }
    })
    // console.log('got new dataByMonth:', this.dataByMonth);
  }
}
