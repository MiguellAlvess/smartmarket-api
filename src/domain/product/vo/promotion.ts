import { InvalidPromotionError } from "../../errors/product/product-errors.js"
import Price from "./price.js"

export default class Promotion {
  private active: boolean
  private startsAt?: Date
  private endsAt?: Date
  private promoPrice?: Price

  constructor(
    active: boolean,
    promoPrice?: Price,
    startsAt?: Date,
    endsAt?: Date
  ) {
    if (!this.validate(active, promoPrice, startsAt, endsAt))
      throw new InvalidPromotionError()

    this.active = active
    this.promoPrice = promoPrice
    this.startsAt = startsAt
    this.endsAt = endsAt
  }

  private validate(
    active: boolean,
    promotionPrice?: Price,
    startsAt?: Date,
    endsAt?: Date
  ) {
    if (active && !promotionPrice) return false
    if (startsAt && endsAt && startsAt > endsAt) return false
    return true
  }

  getPromoPrice() {
    return this.promoPrice?.getValue()
  }

  isActive() {
    return this.active
  }

  getPeriod() {
    return { startsAt: this.startsAt, endsAt: this.endsAt }
  }
}
