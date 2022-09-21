import { ChannelsResponse } from "@/latipay/apis/models/channel/ChannelsResponse";
import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";
import { GatewaysResponse } from "@/latipay/apis/models/gateway/GatewaysResponse";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";

export interface PricingPlansResponse {

  id: number;
  merchantId: number;
  merchant: MerchantsResponse
  walletId: number;
  wallet: WalletsResponse;

  channelId: number;
  channel: ChannelsResponse
  gatewayId: number;
  gateway: GatewaysResponse;
  scenario: string;

  collectionCurrency:  string;
  creditCurrency: string;
  settlementCurrency:  string;

  includeFees: boolean;
  feeRate: number;
  fixedFee: number;
  maxFee: number;
  minFee: number;

  refundFeeCurrency:  string;
  refundFeeRate: number;
  refundFixedFee: number;
  refundMaxFee: number;
  refundMinFee: number;

  chargebackFeeCurrency:  string;
  chargebackFeeRate: number;
  chargebackFixedFee: number;
  chargebackMaxFee: number;
  chargebackMinFee: number;

  settlementFeeCurrency:  string;
  settlementFeeRate: number;
  settlementFixedFee: number;
  settlementMaxFee: number;
  settlementMinFee: number;

  tier: number;
  enabled: boolean;
  createdAt:  string;
  updatedAt: string;


  // 放在gatwway 下
  // network?
  // CountryID?
  //
  // 遗漏处理方式？
  // IfCollectConversion
  // CollectConversionFeeCurrency
  // CollectConversionFeeAmount
  //
  // IfRollingReserve
  // PerTicket
  // RollngDays
  // AnyPromotionDiscount
  // DiscountRate
  // DiscountAmount
  //
  // AvailableRefundDays
  // AvailableRefundType
  // RefundScheduledDays
  // IfRefundConversion
  // OutdatedRefundConversionType




}
