-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_categoryId_fkey";

-- AlterTable
ALTER TABLE "Feed" ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
