import {
  InvalidPromoPeriodError,
  InvalidPromotionStateError,
} from "../../errors/product/product-errors.js"
import Price from "./price.js"

export default class Pricing {
  private priceInCents: Price
  private promoPrice?: Price
  private promoActive: boolean
  private promoStartsAt?: Date
  private promoEndsAt?: Date

  constructor(
    priceInCents: Price,
    promoPrice?: Price,
    promoActive = false,
    promoStartsAt?: Date,
    promoEndsAt?: Date
  ) {
    if (promoActive && !promoPrice) throw new InvalidPromotionStateError()
    if (promoStartsAt && promoEndsAt && promoStartsAt > promoEndsAt)
      throw new InvalidPromoPeriodError()
    this.priceInCents = priceInCents
    this.promoPrice = promoPrice
    this.promoActive = promoActive
    this.promoStartsAt = promoStartsAt
    this.promoEndsAt = promoEndsAt
  }
}
