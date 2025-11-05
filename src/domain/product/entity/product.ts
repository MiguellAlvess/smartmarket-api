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
    expiresAt?: Date
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
  }

  static create(
    name: string,
    description: string,
    type: string,
    priceInCents: number,
    promoInCents: number | undefined,
    promoActive: boolean,
    promoStartsAt: Date | undefined,
    promoEndsAt: Date | undefined,
    stock: number,
    expiresAt?: Date
  ) {
    const productId = UUID.create().getValue()
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
      expiresAt
    )
  }

  applyPromotion(
    promoInCents: number | undefined,
    promoActive: boolean,
    promoStartsAt: Date | undefined,
    promoEndsAt: Date | undefined
  ) {
    const basePrice = this.pricing.getPriceInCents()
    const newPricing = new Pricing(
      basePrice,
      promoInCents !== undefined ? new Price(promoInCents) : undefined,
      promoActive,
      promoStartsAt,
      promoEndsAt
    )
    this.pricing = newPricing
  }

  update(fields: {
    name?: string
    description?: string
    type?: string
    priceInCents?: number
    stockQuantity?: number
    expiresAt?: Date
    promoInCents?: number
    promoActive?: boolean
    promoStartsAt?: Date
    promoEndsAt?: Date
  }) {
    if (fields.name !== undefined) this.name = new Name(fields.name)
    if (fields.description !== undefined) this.description = fields.description
    if (fields.type !== undefined) this.type = new Type(fields.type)
    if (fields.priceInCents !== undefined) {
      const newPricing = new Pricing(
        new Price(fields.priceInCents),
        this.pricing.getPromoInCents(),
        this.pricing.isPromoActive(),
        this.pricing.getPromoStartsAt(),
        this.pricing.getPromoEndsAt()
      )
      this.pricing = newPricing
    }
    if (fields.expiresAt !== undefined)
      this.expiresAt = fields.expiresAt
        ? new ExpiresAt(fields.expiresAt)
        : undefined
    if (fields.stockQuantity !== undefined)
      this.stock = new Quantity(fields.stockQuantity)

    const promoProvided =
      fields.promoInCents !== undefined ||
      fields.promoActive !== undefined ||
      fields.promoStartsAt !== undefined ||
      fields.promoEndsAt !== undefined
    if (promoProvided) {
      this.applyPromotion(
        fields.promoInCents ?? this.pricing.getPromoInCents()?.getValue(),
        fields.promoActive ?? this.pricing.isPromoActive(),
        fields.promoStartsAt ?? this.pricing.getPromoStartsAt(),
        fields.promoEndsAt ?? this.pricing.getPromoEndsAt()
      )
    }
  }

  deactivatePromotion() {
    const basePrice = this.pricing.getPriceInCents()
    const newPricing = new Pricing(
      basePrice,
      this.pricing.getPromoInCents(),
      false,
      this.pricing.getPromoStartsAt(),
      this.pricing.getPromoEndsAt()
    )
    this.pricing = newPricing
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

  getEffectivePriceInCents() {
    return this.pricing.getEffectivePriceInCents()
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
}
