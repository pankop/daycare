-- CreateTable
CREATE TABLE "Nanny" (
    "NanID" SERIAL NOT NULL,
    "N_FName" TEXT NOT NULL,
    "N_MName" TEXT,
    "N_LName" TEXT,
    "N_Address" TEXT NOT NULL,
    "N_Phone" TEXT NOT NULL,
    "N_BDate" TIMESTAMP(3) NOT NULL,
    "N_Sex" CHAR(1) NOT NULL,
    "N_HireDate" TIMESTAMP(3) NOT NULL,
    "N_Salary" INTEGER NOT NULL,
    "EnglishSkill" CHAR(1),
    "MandarinSkill" CHAR(1),
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Nanny_pkey" PRIMARY KEY ("NanID")
);

-- CreateTable
CREATE TABLE "Hospitality" (
    "HostID" SERIAL NOT NULL,
    "H_FName" TEXT NOT NULL,
    "H_MName" TEXT,
    "H_LName" TEXT,
    "H_Phone" TEXT NOT NULL,
    "H_BDate" TIMESTAMP(3) NOT NULL,
    "H_Sex" CHAR(1) NOT NULL,
    "H_HireDate" TIMESTAMP(3) NOT NULL,
    "H_Salary" INTEGER NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Hospitality_pkey" PRIMARY KEY ("HostID")
);

-- CreateTable
CREATE TABLE "Parent" (
    "ParentID" SERIAL NOT NULL,
    "P_FName" TEXT NOT NULL,
    "P_MName" TEXT,
    "P_LName" TEXT,
    "P_Address" TEXT NOT NULL,
    "P_Phone" TEXT NOT NULL,
    "Relationship" CHAR(1) NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("ParentID")
);

-- CreateTable
CREATE TABLE "Child" (
    "ChildID" SERIAL NOT NULL,
    "C_FName" TEXT NOT NULL,
    "C_MName" TEXT,
    "C_LName" TEXT,
    "C_BDate" TIMESTAMP(3) NOT NULL,
    "C_Sex" CHAR(1) NOT NULL,
    "Parent_ID1" INTEGER NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("ChildID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentNo" SERIAL NOT NULL,
    "PaymentDate" TIMESTAMP(3) NOT NULL,
    "TotalAmount" INTEGER NOT NULL,
    "Hos_ID" INTEGER NOT NULL,
    "Ch_ID2" INTEGER NOT NULL,
    "PaymentMethod_ID" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentNo")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "PaymentMethodNo" SERIAL NOT NULL,
    "PaymentMethodName" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("PaymentMethodNo")
);

-- CreateTable
CREATE TABLE "Take_Care" (
    "TakeCare_ID" SERIAL NOT NULL,
    "Nan_ID" INTEGER NOT NULL,
    "Ch_ID1" INTEGER NOT NULL,
    "CareStartDate" TIMESTAMP(3) NOT NULL,
    "CareEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Take_Care_pkey" PRIMARY KEY ("TakeCare_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nanny_N_Phone_key" ON "Nanny"("N_Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Nanny_Username_key" ON "Nanny"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitality_H_Phone_key" ON "Hospitality"("H_Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitality_Username_key" ON "Hospitality"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_P_Phone_key" ON "Parent"("P_Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_Username_key" ON "Parent"("Username");

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
