import ExpiresAt from "../vo/expires-at.js"
import Name from "../vo/name.js"
import Price from "../vo/price.js"
import Pricing from "../vo/pricing.js"
import Quantity from "../vo/quantity.js"
import Type from "../vo/type.js"
import UUID from "../vo/uuid.js"

export default class Product {
  private productId: UUID
  private name: Name
  private description: string
  private type: Type
  private pricing: Pricing
  private expiresAt?: ExpiresAt
  private stock: Quantity
  private imageUrl?: string

  constructor(
    productId: string,
    name: string,
    description: string,
    type: string,
    priceInCents: number,
    promoInCents: number | undefined,
    promoActive: boolean,
    promoStartsAt: Date | undefined,
    promoEndsAt: Date | undefined,
    stock: number,
    expiresAt?: Date,
    imageUrl?: string
  ) {
    this.productId = new UUID(productId)
    this.name = new Name(name)
    this.description = description
    this.type = new Type(type)
    this.pricing = new Pricing(
      new Price(priceInCents),
      promoInCents !== undefined ? new Price(promoInCents) : undefined,
      promoActive,
      promoStartsAt,
      promoEndsAt
    )
    this.expiresAt = expiresAt ? new ExpiresAt(expiresAt) : undefined
    this.stock = new Quantity(stock)
    this.imageUrl = imageUrl
  }

  static create(
    productId: string,
    name: string,
    description: string,
    type: string,
    priceInCents: number,
    promoInCents: number | undefined,
    promoActive: boolean,
    promoStartsAt: Date | undefined,
    promoEndsAt: Date | undefined,
    stock: number,
    expiresAt?: Date,
    imageUrl?: string
  ) {
    return new Product(
      productId,
      name,
      description,
      type,
      priceInCents,
      promoInCents,
      promoActive,
      promoStartsAt,
      promoEndsAt,
      stock,
      expiresAt,
      imageUrl
    )
  }
  getId() {
    return this.productId.getValue()
  }

  getName() {
    return this.name.getValue()
  }

  getDescription() {
    return this.description
  }

  getType() {
    return this.type.getValue()
  }

  getPromoInCents() {
    return this.pricing.getPromoInCents()
  }

  getPriceInCents() {
    return this.pricing.getPriceInCents()
  }

  isPromoActive() {
    return this.pricing.isPromoActive()
  }

  getPromoStartsAt() {
    return this.pricing.getPromoStartsAt()
  }

  getPromoEndsAt() {
    return this.pricing.getPromoEndsAt()
  }

  getExpiresAt() {
    return this.expiresAt?.getValue()
  }

  getStockQuantity() {
    return this.stock.getValue()
  }

  getImageUrl() {
    return this.imageUrl
  }
}
