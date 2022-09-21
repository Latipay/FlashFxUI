import { GatewaysResponse } from "@/latipay/apis/models/gateway/GatewaysResponse";
import { ChannelsResponse } from "@/latipay/apis/models/channel/ChannelsResponse";

export interface LatipayChannelsResponse {
  id: number;
  gatewayId: number; //中间关系
  channelId: number;
  region: string;
  country: string;
  collectionCurrency: string;
  creditCurrency: string;
  settlementCurrency: string;

  scenario: string;
  cryptoNetwork: string;
  tier: number;

  hasFee: boolean;
  feeRate: number;
  maxFee: number;
  minFee: number;
  hasFixedFee: boolean;
  fixedFee: number;
  fixedFeeCurrency: string;

  hasChargebackFee: boolean;
  chargebackFee: number;
  chargebackFeeCurrency: string;

  hasRefundFee: boolean;
  refundFee: number;
  refundFeeCurrency: string;

  hasRollingReserve: boolean;
  rollingReserveRate: number;
  rollingDays: number;

  hasDiscount: boolean;
  discountRate: number;
  discountAmount: number;

  hasSettlementFee: boolean;
  settlementFee: number;
  settlementFeeCurrency: string;
  settlementCycleDays: string;

  hasConversion: boolean;
  conversionRate: number;

  gateway: GatewaysResponse;
  channel: ChannelsResponse;

  createdAt: string;
  updatedAt: string;


}
