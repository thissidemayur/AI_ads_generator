import type { IAdRepository } from "@project/shared";
import type { Ad, AdStatus, PrismaClient } from "@project/shared/server";

export class AdRepository implements IAdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Partial<Ad>): Promise<Ad> {
    return this.prisma.ad.create({
      data: data as any,
    });
  }

  async findById(adId: string, tenantId: string): Promise<Ad | null> {
    return this.prisma.ad.findFirst({
      where: {
        id: adId,
        tenantId,
      },
    });
  }

  async findByTenant(
    tenantId: string,
    limit: number,
    offset: number,
  ): Promise<Ad[]> {
    return this.prisma.ad.findMany({
      where: { tenantId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(
    adId: string,
    status: AdStatus,
    data: {
      contentUrl?: string;
      error?: string;
      externalJobId?: string;
      refinedPrompt?:string
    },
  ): Promise<Ad> {
    return this.prisma.ad.update({
      where: { id: adId },
      data: {
        status,
        contentUrl: data.contentUrl,
        externalJobId: data.externalJobId,
      },
    });
  }

  async createWithTx(
    tenantId: string,
    cost: number,
    adData: Partial<Ad>,
  ): Promise<Ad> {
    return this.prisma.$transaction(async (tx) => {
      // verify and deduct token
      const tenant = await tx.tenant.update({
        where: { id: tenantId },
        data: {
          tokenBalance: {
            decrement: cost,
          },
        },
      });

      // balance didnot go -ve
      if (tenant.tokenBalance < 0) {
        throw new Error("INSUFFICIENT_TOKENS");
      }

      const ad = await tx.ad.create({
        data: {
          ...adData,
          tenantId,
        } as any,
      });

      // update transactopm
      await tx.transaction.create({
        data: {
          tenantId,
          amount: -cost,
          type: "GENERATION",
          adId: ad.id,
        },
      });

      return ad;
    });
  }

  async delete(adId: string, tenantId: string): Promise<Ad> {
    return this.prisma.ad.delete({
      where: {
        id: adId,
        tenantId,
      },
    });
  }

  async refundTokens(
    tenantId: string,
    adId: string,
    amount: number,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.tenant.update({
        where: { id: tenantId },
        data: { tokenBalance: { increment: amount } },
      }),
      // create refund record on transacition
      this.prisma.transaction.create({
        data: {
          tenantId,
          adId,
          amount, //+ve no for refund
          type: "REFUND",
        },
      }),
    ]);
  }
}
