export class AggregatorDto {
  id: number;
  name: string = '';
  clientName: string = '';
  isVisibleOnProductPage: boolean = true;
  productIds: number[] = [];
}
