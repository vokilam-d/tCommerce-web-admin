import { ShipmentParticipantDto } from './shipment-participant.dto';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentPayerEnum } from '../enums/shipment-payer.enum';
import { ShipmentPaymentMethodEnum } from '../enums/shipment-payment-method.enum';
import { ShipmentStatusEnum } from '../enums/shipment-status.enum';

export class ShipmentDto {
  trackingNumber?: string = '';
  estimatedDeliveryDate?: string = '';
  status?: ShipmentStatusEnum;
  statusDescription?: string = '';
  sender?: ShipmentParticipantDto = new ShipmentParticipantDto();
  recipient?: ShipmentParticipantDto = new ShipmentParticipantDto();
  shipmentType?: ShipmentTypeEnum = ShipmentTypeEnum.WAREHOUSE_WAREHOUSE;
  payerType?: ShipmentPayerEnum = ShipmentPayerEnum.RECIPIENT;
  paymentMethod?: ShipmentPaymentMethodEnum = ShipmentPaymentMethodEnum.CASH;
  date?: string = '';
  weight?: string = '';
  length?: string = '';
  width?: string = '';
  height?: string = '';
  backwardMoneyDelivery?: string = '';
  description?: string = '';
}
