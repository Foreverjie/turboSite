-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginIp" TEXT,
ADD COLUMN     "lastLoginTime" TIMESTAMP(3);
