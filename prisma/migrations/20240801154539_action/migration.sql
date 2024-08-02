-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT,
    "qty" REAL,
    "typeId" INTEGER,
    "taskId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "Action_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "actionType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "actionType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "subtype" TEXT,
    "useInSelection" BOOLEAN NOT NULL DEFAULT true
);
