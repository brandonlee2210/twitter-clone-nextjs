import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

// hack for nextjs hot reloading. The reason for that is nextJS create a bunch of prisma client instances when hot reloading

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
