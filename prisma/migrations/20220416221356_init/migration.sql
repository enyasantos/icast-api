-- CreateTable
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Podcast_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Brazil',
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_file_key" ON "Podcast"("file");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
