import {
  InvalidPromoPeriodError,
  InvalidPromotionStateError,
} from "../../errors/product/product-errors.js"
import Price from "./price.js"

export default class Pricing {
  private priceInCents: Price
  private promoInCents?: Price
  private promoActive: boolean
  private promoStartsAt?: Date
  private promoEndsAt?: Date

  constructor(
    priceInCents: Price,
    promoInCents?: Price,
    promoActive = false,
    promoStartsAt?: Date,
    promoEndsAt?: Date
  ) {
    if (promoActive && !promoInCents) throw new InvalidPromotionStateError()
    if (promoStartsAt && promoEndsAt && promoStartsAt > promoEndsAt)
      throw new InvalidPromoPeriodError()
    this.priceInCents = priceInCents
    this.promoInCents = promoInCents
    this.promoActive = promoActive
    this.promoStartsAt = promoStartsAt
    this.promoEndsAt = promoEndsAt
  }

  getPriceInCents() {
    return this.priceInCents
  }

  getPromoInCents() {
    return this.promoInCents
  }

  isPromoActive() {
    return this.promoActive
  }

  getPromoStartsAt() {
    return this.promoStartsAt
  }

  getPromoEndsAt() {
    return this.promoEndsAt
  }

  isCurrentlyActive(now: Date = new Date()) {
    if (!this.promoActive) return false
    if (!this.promoInCents) return false
    if (this.promoStartsAt && now < this.promoStartsAt) return false
    if (this.promoEndsAt && now > this.promoEndsAt) return false
    return true
  }

  getEffectivePriceInCents(now: Date = new Date()) {
    if (this.isCurrentlyActive(now) && this.promoInCents) {
      return this.promoInCents
    }
    return this.priceInCents
  }
}
