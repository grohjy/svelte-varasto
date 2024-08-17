-- CreateTable
CREATE TABLE "TaskAndChildItems" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "itemCount" INTEGER NOT NULL DEFAULT 1,
    "unitsCount" INTEGER NOT NULL DEFAULT 1,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    PRIMARY KEY ("parentId", "childId"),
    CONSTRAINT "TaskAndChildItems_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskAndChildItems_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
