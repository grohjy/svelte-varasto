-- CreateTable
CREATE TABLE "ChildsOnProducts" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL,

    PRIMARY KEY ("parentId", "childId"),
    CONSTRAINT "ChildsOnProducts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChildsOnProducts_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
