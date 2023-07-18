/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('NEED_ONBOARDING', 'INFOMATION_INCOMPLETE', 'ACTIVE', 'ERROR', 'LOCKED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'NEED_ONBOARDING';
