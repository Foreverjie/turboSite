/*
  Warnings:

  - A unique constraint covering the columns `[commentId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - The required column `commentId` was added to the `Comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('CATEGORY', 'TAG');

-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('MD', 'HTML', 'FRAME');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_repostId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "repostId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL DEFAULT 'CATEGORY',
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "images" TEXT[],
    "subtitle" TEXT,
    "order" INTEGER,
    "type" "PageType" NOT NULL DEFAULT 'MD',
    "options" JSONB,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_commentId_key" ON "Comment"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_postId_key" ON "Comment"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_repostId_fkey" FOREIGN KEY ("repostId") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;
