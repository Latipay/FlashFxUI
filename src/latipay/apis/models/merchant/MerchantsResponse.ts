export interface MerchantsResponse {
  id: number;
  slug: string;
  type: string;
  status: string;
  enabled: boolean;

  createdAt: string;

  entityName: string
  entityNumber: string
  entityTradingNames: string
  entityType: string;

  name: string;

  updatedAt: string;
}
