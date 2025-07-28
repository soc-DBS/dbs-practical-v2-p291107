-- CreateTable
CREATE TABLE "StaffDependent" (
    "staff_no" CHAR(4) NOT NULL,
    "dependent_name" VARCHAR(30) NOT NULL,
    "relationship" VARCHAR(20) NOT NULL,

    CONSTRAINT "StaffDependent_pkey" PRIMARY KEY ("staff_no","dependent_name")
);
