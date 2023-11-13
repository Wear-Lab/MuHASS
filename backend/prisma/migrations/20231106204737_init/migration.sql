-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" INTEGER NOT NULL,
    "acceleration" INTEGER[],
    "magnetic" INTEGER[],
    "gyroscope" INTEGER[],
    "temperature" DOUBLE PRECISION NOT NULL,
    "pressure" INTEGER NOT NULL,
    "altitude" INTEGER NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "gsr" INTEGER NOT NULL,
    "ppg" INTEGER[],
    "hr" INTEGER NOT NULL,
    "microphone" INTEGER NOT NULL,
    "k" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculated" (
    "id" INTEGER NOT NULL,
    "enmo" INTEGER NOT NULL,
    "lvpa" INTEGER NOT NULL,
    "mvpa" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Calculated_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_userId_key" ON "Data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Calculated_userId_key" ON "Calculated"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculated" ADD CONSTRAINT "Calculated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
