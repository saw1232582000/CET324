/*
  Warnings:

  - Added the required column `isUsed` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ADD COLUMN     "isUsed" BOOLEAN NOT NULL;
