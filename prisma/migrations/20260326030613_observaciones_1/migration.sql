-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Reason" ADD VALUE 'Comercio';
ALTER TYPE "Reason" ADD VALUE 'Salud';
ALTER TYPE "Reason" ADD VALUE 'Estudios';

-- AlterEnum
ALTER TYPE "TypeDocuments" ADD VALUE 'DNI_Bolivia';

-- DropForeignKey
ALTER TABLE "client-stay" DROP CONSTRAINT "client-stay_stayId_fkey";

-- DropForeignKey
ALTER TABLE "pay" DROP CONSTRAINT "pay_stayId_fkey";

-- AddForeignKey
ALTER TABLE "client-stay" ADD CONSTRAINT "client-stay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "pay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
