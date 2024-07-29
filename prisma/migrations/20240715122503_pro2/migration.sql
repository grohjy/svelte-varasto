-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChildsOnProducts" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    PRIMARY KEY ("parentId", "childId"),
    CONSTRAINT "ChildsOnProducts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChildsOnProducts_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChildsOnProducts" ("childId", "count", "parentId", "unit") SELECT "childId", "count", "parentId", "unit" FROM "ChildsOnProducts";
DROP TABLE "ChildsOnProducts";
ALTER TABLE "new_ChildsOnProducts" RENAME TO "ChildsOnProducts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
