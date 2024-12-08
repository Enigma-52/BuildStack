/*
  Warnings:

  - Added the required column `comments` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isApproved` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvotes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'READ', 'RESPONDED', 'ARCHIVED', 'SPAM');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "comments" JSONB NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "currentCompany" TEXT,
ADD COLUMN     "github_url" TEXT,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "twitter_url" TEXT;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
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
