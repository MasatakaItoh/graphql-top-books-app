import prisma from "../../prisma/db";

export type Context = {
  prisma: typeof prisma;
};
