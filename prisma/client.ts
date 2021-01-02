/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Prisma } from '@prisma/client';

// Prevent Prisma from opening too many database connections in local development
// From https://next-auth.js.org/schemas/adapters#custom-models

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient<Prisma.PrismaClientOptions, never>;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error prisma is a custom global
  if (!global.prisma) {
    // @ts-expect-error prisma is a custom global
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error prisma is a custom global
  prisma = global.prisma;
}

export { prisma };
