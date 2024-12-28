import { PrismaClient } from "@prisma/client";
import { Rocket } from "./__generated__/graphql.js";

export class RocketDataSource {
  prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  getRockets(): Promise<Rocket[]> {
    return this.prisma.rocket.findMany()
  }
}
