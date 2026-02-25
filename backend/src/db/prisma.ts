import { PrismaClient } from "@prisma/client";
import { configEnv } from "../shared";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (configEnv.node_env !== "production") {
  globalForPrisma.prisma = prisma;
}
