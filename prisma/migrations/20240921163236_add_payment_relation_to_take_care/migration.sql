/*
  Warnings:

  - Added the required column `PaymentNo` to the `Take_Care` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Take_Care" ADD COLUMN     "PaymentNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Take_Care" ADD CONSTRAINT "Take_Care_PaymentNo_fkey" FOREIGN KEY ("PaymentNo") REFERENCES "Payment"("PaymentNo") ON DELETE RESTRICT ON UPDATE CASCADE;
