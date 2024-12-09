/*
  Warnings:

  - Added the required column `comments` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isApproved` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvotes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "comments" JSONB NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "status" TEXT,
    "tag" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
