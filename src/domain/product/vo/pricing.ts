import Price from "./price.js"

export default class Pricing {
  private priceInCents: Price
  private promoInCents?: Price

  constructor(priceInCents: Price, promoInCents?: Price) {
    this.priceInCents = priceInCents
    this.promoInCents = promoInCents
  }

  getPriceInCents() {
    return this.priceInCents.getValue()
  }
  getPromoInCents() {
    return this.promoInCents?.getValue()
  }
}
