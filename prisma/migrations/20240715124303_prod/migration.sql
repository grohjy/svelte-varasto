-- CreateTable
CREATE TABLE "ChildsOnProducts" (
    "parentId" INTEGER NOT NULL,
    "child2Id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    PRIMARY KEY ("parentId", "child2Id"),
    CONSTRAINT "ChildsOnProducts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChildsOnProducts_child2Id_fkey" FOREIGN KEY ("child2Id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
