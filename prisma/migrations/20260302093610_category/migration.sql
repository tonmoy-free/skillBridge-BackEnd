/*
  Warnings:

  - You are about to drop the `TutorCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_tutorId_fkey";

-- DropIndex
DROP INDEX "Category_id_key";

-- DropTable
DROP TABLE "TutorCategory";

-- CreateTable
CREATE TABLE "_CategoryToTutorProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToTutorProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToTutorProfile_B_index" ON "_CategoryToTutorProfile"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTutorProfile" ADD CONSTRAINT "_CategoryToTutorProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTutorProfile" ADD CONSTRAINT "_CategoryToTutorProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
