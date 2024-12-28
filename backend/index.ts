import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"
import { readFileSync } from "fs"
import { RocketDataSource } from "./datasources.js"
import resolvers from "./resolvers.js"

// needed for the generic bound on ApolloServer, otherwise the type of server
// somehow gets inferred as ApolloServer<GraphQLResolveInfo>
export type Context = {
  rocketDataSource: RocketDataSource,
}

const typeDefs = readFileSync("./schema.graphql", "utf8")

const isDev = process.env.NODE_ENV === "development"
const prisma = new PrismaClient({ log: isDev ? ["query"]: [] })
const rocketDataSource = new RocketDataSource(prisma)

// probably want to use express to get more control over the middleware
const server = new ApolloServer<Context>({ typeDefs, resolvers })
const port = parseInt(process.env.APOLLO_SERVER_PORT ?? "") || 4000

const { url } = await startStandaloneServer(server, {
  context: async () => ({ rocketDataSource }), // basically stateless, no need to recreate on request
  listen: { port },
})

console.log(`Server ready at ${url}`)
