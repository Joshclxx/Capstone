import {PrismaClient} from '@prisma/client'

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined //prisma Can b PrismaClient if there's a connection and undefined if there's no connection
}

//check if prisma have connnection
export const prisma = globalPrisma.prisma?? new PrismaClient({
    log: ['query', 'error', 'warn'] //create new connection if not connected to database //useful if um not going to make a finaly option for disconnection
}) 

