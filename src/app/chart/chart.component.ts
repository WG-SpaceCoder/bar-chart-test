import { Component } from '@angular/core';
import { ChartDataService } from '../chart-data.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../search-result';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from "../bar-chart/bar-chart.component";

@Component({
    selector: 'app-chart',
    standalone: true,
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
    imports: [CommonModule, BarChartComponent]
})
export class ChartComponent {
  items$: Observable<SearchResult[]>;
  dataByMonth: any;
  monthToDisplay: number | undefined;
  currentMonthName: string | undefined;
  showJobs: SearchResult[] = [];
  isLoading: boolean = true;

  constructor(private chartData: ChartDataService) {
    this.items$ = this.chartData.data$;
  }

  ngOnInit(): void {
    this.chartData.data$.subscribe((data) => {
      // console.log('data', data);
      if (this.isLoading && data?.length > 0) {
        this.isLoading = false;
      }
    })
    this.chartData.getNewData();
  }

  refreshData(): void {
    this.chartData.getNewData();
  }

  displayByMonth(month: number): void {
    // console.log('event', month)
    this.monthToDisplay = month;
    this.currentMonthName = this.chartData.getMonthName(month);
    this.setShowJobs();
  }

  setShowJobs(): void {
    this.showJobs = this.chartData.getData().filter((job) => {
      let date = new Date(job.websiteDatePublished);
      return date.getMonth() == this.monthToDisplay;
    });
  }

  getDate(dateString: string): Date {
    return new Date(dateString);
  }

}
