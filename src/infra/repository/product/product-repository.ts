import { ProductType as PrismaProductType } from "@prisma/client"
import { PrismaClient } from "@prisma/client/extension"

import { ProductRepository } from "../../../application/ports/repository/product-repository.js"
import Product from "../../../domain/product/entity/product.js"
import { prisma } from "../../database/prisma.js"

function toPrismaProductType(type: string): PrismaProductType {
  const normalized = type.trim().toUpperCase()
  const map: Record<string, PrismaProductType> = {
    FOOD: PrismaProductType.FOOD,
    BEVERAGE: PrismaProductType.BEVERAGE,
    CLEANING: PrismaProductType.CLEANING,
    HYGIENE: PrismaProductType.HYGIENE,
    OTHER: PrismaProductType.OTHER,
  }
  return map[normalized] ?? PrismaProductType.OTHER
}

export default class ProductRepositoryDatabase implements ProductRepository {
  constructor(private database: typeof PrismaClient) {}
  async create(product: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: product.getId(),
        name: product.getName(),
        description: product.getDescription(),
        type: toPrismaProductType(product.getType()),
        priceInCents: product.getPriceInCents().getValue(),
        promoInCents: product.getPromoInCents()?.getValue(),
        promoActive: product.isPromoActive(),
        promoStartsAt: product.getPromoStartsAt(),
        promoEndsAt: product.getPromoEndsAt(),
        expiresAt: product.getExpiresAt(),
        stockQuantity: product.getStockQuantity(),
      },
    })
  }

  async findById(id: string): Promise<Product | null> {
    const productRow = await prisma.product.findUnique({ where: { id } })
    if (!productRow) return null
    const promoInCents = productRow.promoInCents ?? undefined
    const promoStartsAt = productRow.promoStartsAt ?? undefined
    const promoEndsAt = productRow.promoEndsAt ?? undefined
    const expiresAt = productRow.expiresAt ?? undefined
    return new Product(
      productRow.id,
      productRow.name,
      productRow.description,
      productRow.type,
      productRow.priceInCents,
      promoInCents,
      productRow.promoActive,
      promoStartsAt,
      promoEndsAt,
      productRow.stockQuantity,
      expiresAt
    )
  }
}
