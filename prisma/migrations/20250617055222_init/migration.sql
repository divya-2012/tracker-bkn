-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "digiPin" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingData" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackingData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackingData" ADD CONSTRAINT "TrackingData_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
