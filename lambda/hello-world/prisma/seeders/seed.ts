import {dishList} from '../data/dish_data'
import {stockList} from '../data/stock_data'
import {dishStockList} from '../data/dish_stock_data'
import { PrismaClient } from "@prisma/client/edge";
import { error } from "console";

const prisma = new PrismaClient()

async function populateDatabase() {
        await prisma.dishes.createMany({
            data: dishList
        });
        await prisma.stocks.createMany({
            data: stockList
        });
        await prisma.dishes_stocks.createMany({
            data: dishStockList
        });
    
}
populateDatabase()
.catch((error) => {
    console.log(error);
    process.exit(1);
})
.finally(async () => {
    prisma.$disconnect();
})