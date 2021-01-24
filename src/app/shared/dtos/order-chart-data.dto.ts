import { ChartDataDto } from './chart-data.dto';

export class OrderChartDataDto extends ChartDataDto {
  client: number;
  manager: number;
}
