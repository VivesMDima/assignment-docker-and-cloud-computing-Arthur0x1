import { Resolvers } from "./__generated__/graphql.js"

const resolvers: Resolvers = {
  Query: {
    rockets: (_src, _args, ctx, _info) => ctx.rocketDataSource.getRockets()
  },
}

export default resolvers
