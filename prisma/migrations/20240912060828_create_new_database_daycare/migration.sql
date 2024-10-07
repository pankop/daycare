/*
  Warnings:

  - The primary key for the `Child` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Hospitality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Nanny` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Parent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PaymentMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Take_Care` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_Parent_ID1_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Ch_ID2_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Hos_ID_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_PaymentMethod_ID_fkey";

-- DropForeignKey
ALTER TABLE "Take_Care" DROP CONSTRAINT "Take_Care_Ch_ID1_fkey";

-- DropForeignKey
ALTER TABLE "Take_Care" DROP CONSTRAINT "Take_Care_Nan_ID_fkey";

-- AlterTable
ALTER TABLE "Child" DROP CONSTRAINT "Child_pkey",
ALTER COLUMN "ChildID" DROP DEFAULT,
ALTER COLUMN "ChildID" SET DATA TYPE TEXT,
ALTER COLUMN "Parent_ID1" SET DATA TYPE TEXT,
ADD CONSTRAINT "Child_pkey" PRIMARY KEY ("ChildID");
DROP SEQUENCE "Child_ChildID_seq";

-- AlterTable
ALTER TABLE "Hospitality" DROP CONSTRAINT "Hospitality_pkey",
ALTER COLUMN "HostID" DROP DEFAULT,
ALTER COLUMN "HostID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Hospitality_pkey" PRIMARY KEY ("HostID");
DROP SEQUENCE "Hospitality_HostID_seq";

-- AlterTable
ALTER TABLE "Nanny" DROP CONSTRAINT "Nanny_pkey",
ALTER COLUMN "NanID" DROP DEFAULT,
ALTER COLUMN "NanID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Nanny_pkey" PRIMARY KEY ("NanID");
DROP SEQUENCE "Nanny_NanID_seq";

-- AlterTable
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_pkey",
ALTER COLUMN "ParentID" DROP DEFAULT,
ALTER COLUMN "ParentID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Parent_pkey" PRIMARY KEY ("ParentID");
DROP SEQUENCE "Parent_ParentID_seq";

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "PaymentNo" DROP DEFAULT,
ALTER COLUMN "PaymentNo" SET DATA TYPE TEXT,
ALTER COLUMN "Hos_ID" SET DATA TYPE TEXT,
ALTER COLUMN "Ch_ID2" SET DATA TYPE TEXT,
ALTER COLUMN "PaymentMethod_ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentNo");
DROP SEQUENCE "Payment_PaymentNo_seq";

-- AlterTable
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_pkey",
ALTER COLUMN "PaymentMethodNo" DROP DEFAULT,
ALTER COLUMN "PaymentMethodNo" SET DATA TYPE TEXT,
ADD CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("PaymentMethodNo");
DROP SEQUENCE "PaymentMethod_PaymentMethodNo_seq";

-- AlterTable
ALTER TABLE "Take_Care" DROP CONSTRAINT "Take_Care_pkey",
ALTER COLUMN "TakeCare_ID" DROP DEFAULT,
ALTER COLUMN "TakeCare_ID" SET DATA TYPE TEXT,
ALTER COLUMN "Nan_ID" SET DATA TYPE TEXT,
ALTER COLUMN "Ch_ID1" SET DATA TYPE TEXT,
ADD CONSTRAINT "Take_Care_pkey" PRIMARY KEY ("TakeCare_ID");
DROP SEQUENCE "Take_Care_TakeCare_ID_seq";

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_Parent_ID1_fkey" FOREIGN KEY ("Parent_ID1") REFERENCES "Parent"("ParentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Hos_ID_fkey" FOREIGN KEY ("Hos_ID") REFERENCES "Hospitality"("HostID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Ch_ID2_fkey" FOREIGN KEY ("Ch_ID2") REFERENCES "Child"("ChildID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_PaymentMethod_ID_fkey" FOREIGN KEY ("PaymentMethod_ID") REFERENCES "PaymentMethod"("PaymentMethodNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Take_Care" ADD CONSTRAINT "Take_Care_Nan_ID_fkey" FOREIGN KEY ("Nan_ID") REFERENCES "Nanny"("NanID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Take_Care" ADD CONSTRAINT "Take_Care_Ch_ID1_fkey" FOREIGN KEY ("Ch_ID1") REFERENCES "Child"("ChildID") ON DELETE RESTRICT ON UPDATE CASCADE;
