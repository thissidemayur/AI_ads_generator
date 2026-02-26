import type { Ad, AdStatus } from "../database";

export interface IAdRepository {
  create(data: Partial<Ad>): Promise<Ad>;
  findById(adId: string, tenantId: string): Promise<Ad | null>;
  findByTenant(tenantId: string, limit: number, offset: number): Promise<Ad[]>;
  updateStatus(
    adId: string,
    status: AdStatus,
    metadata: {
      contentUrl?: string;
      error?: string;
      errorMessage?: string;
      refinedPrompt?:string
    },
  ): Promise<Ad>;

  createWithTx(
    tenantId: string,
    cost: number,
    adData: Partial<Ad>,
  ): Promise<Ad>;

  delete(adId: string, tenantId: string): Promise<Ad>;
  refundTokens(tenantId: string, adId: string, amount: number): Promise<void>;
}