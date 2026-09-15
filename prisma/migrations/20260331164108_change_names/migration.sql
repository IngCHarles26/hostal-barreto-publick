/*
  Warnings:

  - You are about to drop the `client-stay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report-comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room-reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "client-stay" DROP CONSTRAINT "client-stay_clientId_fkey";

-- DropForeignKey
ALTER TABLE "client-stay" DROP CONSTRAINT "client-stay_stayId_fkey";

-- DropForeignKey
ALTER TABLE "room-reservation" DROP CONSTRAINT "room-reservation_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "room-reservation" DROP CONSTRAINT "room-reservation_roomId_fkey";

-- DropTable
DROP TABLE "client-stay";

-- DropTable
DROP TABLE "report-comments";

-- DropTable
DROP TABLE "room-reservation";

-- CreateTable
CREATE TABLE "clientStay" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "stayId" INTEGER NOT NULL,

    CONSTRAINT "clientStay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportComments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "reportComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomReservation" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "roomReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientStay_clientId_stayId_key" ON "clientStay"("clientId", "stayId");

-- CreateIndex
CREATE UNIQUE INDEX "roomReservation_roomId_key" ON "roomReservation"("roomId");

-- AddForeignKey
ALTER TABLE "clientStay" ADD CONSTRAINT "clientStay_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientStay" ADD CONSTRAINT "clientStay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomReservation" ADD CONSTRAINT "roomReservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomReservation" ADD CONSTRAINT "roomReservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
