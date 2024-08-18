-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT,
    "qty" REAL DEFAULT 0,
    "typeId" INTEGER,
    "taskId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "Action_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "actionType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Action" ("createdAt", "id", "info", "qty", "taskId", "typeId", "userId") SELECT "createdAt", "id", "info", "qty", "taskId", "typeId", "userId" FROM "Action";
DROP TABLE "Action";
ALTER TABLE "new_Action" RENAME TO "Action";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
