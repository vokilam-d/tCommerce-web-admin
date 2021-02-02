import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../shared/services/head.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { EChartsOption } from 'echarts';
import { NotyService } from '../../noty/noty.service';
import { finalize } from 'rxjs/operators';
import { DeviceService } from '../../shared/services/device-detector/device.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartOptions: EChartsOption = DEFAULT_ORDERS_CHART_OPTIONS;
  isOrdersLoading: boolean = true;
  isBrowser: boolean;

  constructor(
    private deviceService: DeviceService,
    private headService: HeadService,
    private dashboardService: DashboardService,
    private notyService: NotyService
  ) { }

  ngOnInit() {
    this.isBrowser = this.deviceService.isPlatformBrowser();
    this.headService.setTitle(`Dashboard`);

    if (this.isBrowser) {
      this.getOrders();
    }
  }

  private getOrders() {
    this.isOrdersLoading = true;
    this.dashboardService.getOrdersChart()
      .pipe( this.notyService.attachNoty(), finalize(() => this.isOrdersLoading = false))
      .subscribe(
        response => {

          const dates: string[] = [];
          const countClient: number[] = [];
          const countManager: number[] = [];

          response.data.forEach(datum => {
            const date = new Date(datum.date).toLocaleDateString('ru', {
              timeZone: 'Europe/Kiev',
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            });

            dates.push(date);
            countClient.push(datum.client);
            countManager.push(datum.manager);
          });

          this.chartOptions = {
            xAxis: {
              type: 'category',
              data: dates,
              name: 'Дата'
            },
            yAxis: {
              type: 'value',
              name: 'Кол-во'
            },
            tooltip: {
              trigger: 'axis',
              formatter: params => {
                const name = params[0].name;
                const seriesLines: any[] = params.map(series => this.buildTooltipLine(series.seriesName, series.value, series.marker));
                const sum = params.reduce((acc, series) => acc + series.value, 0);

                return `
                  <div style="color: #666; font-size: 14px; line-height: 1;">
                      <div style="font-weight: 900;">${name}</div>
                      ${seriesLines.reverse().join('')}
                      ${this.buildTooltipLine('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Всего</b>', sum)}
                  </div>
                `;
              }
            },
            dataZoom: [
              {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty',
                start: 80
              },
              {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty',
                start: 80
              }
            ],
            series: [
              {
                type: 'line',
                data: countManager,
                name: 'Менеджер',
                stack: 'stack',
                areaStyle: {},
              },
              {
                name: 'Клиент',
                type: 'line',
                data: countClient,
                stack: 'stack',
                areaStyle: {}
              },
            ]
          };
        }
      );
  }

  onChartInit(chartInstance: any, isLoading: boolean) {
    if (isLoading) {
      chartInstance.showLoading();
    }
  }

  private buildTooltipLine(name, value, marker = ''): string {
    return `
      <div style="margin: 10px 0 0;">
          ${marker}
          ${name}
          <span style="float: right;font-weight: 900;margin: 0 0 0 20px;">${value}</span>
      </div>
    `;
  }
}

const DEFAULT_ORDERS_CHART_OPTIONS: EChartsOption = {
  xAxis: {
    type: 'category',
    name: 'Дата'
  },
  yAxis: {
    type: 'value',
    name: 'Кол-во'
  },
  series: [{
    type: 'line',
  }],
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty',
      start: 80
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'empty',
      start: 80
    }
  ],
};
