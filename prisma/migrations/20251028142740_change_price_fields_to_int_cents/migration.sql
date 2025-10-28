/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promoPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `priceInCents` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
DROP COLUMN "promoPrice",
ADD COLUMN     "priceInCents" INTEGER NOT NULL,
ADD COLUMN     "promoInCents" INTEGER;
