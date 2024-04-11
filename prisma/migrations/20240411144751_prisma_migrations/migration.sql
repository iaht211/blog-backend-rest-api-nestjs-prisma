/*
  Warnings:

  - You are about to drop the column `job` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `membership` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "job",
DROP COLUMN "membership",
DROP COLUMN "role";
