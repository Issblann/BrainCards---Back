-- CreateTable
CREATE TABLE "FlashCard" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoxToFlashCard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FlashCard_userId_key" ON "FlashCard"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Box_userId_key" ON "Box"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BoxToFlashCard_AB_unique" ON "_BoxToFlashCard"("A", "B");

-- CreateIndex
CREATE INDEX "_BoxToFlashCard_B_index" ON "_BoxToFlashCard"("B");

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToFlashCard" ADD CONSTRAINT "_BoxToFlashCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToFlashCard" ADD CONSTRAINT "_BoxToFlashCard_B_fkey" FOREIGN KEY ("B") REFERENCES "FlashCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
