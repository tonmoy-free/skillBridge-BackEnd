/*
  Warnings:

  - You are about to drop the column `classId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_classId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_subjectId_fkey";

-- DropIndex
DROP INDEX "Category_classId_subjectId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "classId",
DROP COLUMN "subjectId",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Subject";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");
