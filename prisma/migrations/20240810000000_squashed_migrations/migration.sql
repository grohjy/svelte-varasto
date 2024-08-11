-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "thumb" TEXT,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "useInSelection" BOOLEAN NOT NULL DEFAULT true,
    "typeId" INTEGER,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "typeItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemChildsAndParents" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "itemCount" INTEGER NOT NULL DEFAULT 1,
    "unitsCount" INTEGER NOT NULL DEFAULT 1,
    "unit" TEXT NOT NULL DEFAULT 'pcs',

    PRIMARY KEY ("parentId", "childId"),
    CONSTRAINT "ItemChildsAndParents_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemChildsAndParents_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "typeItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "subtype" TEXT,
    "useInSelection" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "typeId" INTEGER,
    "itemId" INTEGER,
    "statusId" INTEGER,
    CONSTRAINT "Task_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "taskType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "taskStatus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "taskType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "subtype" TEXT,
    "useInSelection" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "taskStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT
);

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

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" REAL,
    "info" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "itemId" INTEGER,
    "taskId" INTEGER,
    "locationId" INTEGER,
    CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Inventory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Inventory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "StorageLocation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InventoryRemove" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" REAL,
    "info" TEXT,
    "itemId" INTEGER,
    "taskId" INTEGER,
    "inventoryId" INTEGER,
    CONSTRAINT "InventoryRemove_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryRemove_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryRemove_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rack" TEXT,
    "location" TEXT,
    "info" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortname" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_shortname_key" ON "User"("shortname");

