import { PrismaClient } from '@prisma/client';

// Ensures a single instance of PrismaClient is used across the application.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;