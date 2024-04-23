-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenExpireDate" TEXT,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);
