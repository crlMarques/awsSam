-- CreateTable
CREATE TABLE "dishes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.813+00'::timestamp with time zone,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.813+00'::timestamp with time zone,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dishes_stocks" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.822+00'::timestamp with time zone,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.822+00'::timestamp with time zone,
    "dishId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "ingredient" VARCHAR(255) NOT NULL,

    CONSTRAINT "dishes_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "quantity" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.791+00'::timestamp with time zone,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT '2023-12-11 15:59:49.791+00'::timestamp with time zone,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stocks_name_key" ON "stocks"("name");

-- AddForeignKey
ALTER TABLE "dishes_stocks" ADD CONSTRAINT "dishes_stocks_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dishes_stocks" ADD CONSTRAINT "dishes_stocks_ingredient_fkey" FOREIGN KEY ("ingredient") REFERENCES "stocks"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dishes_stocks" ADD CONSTRAINT "dishes_stocks_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
