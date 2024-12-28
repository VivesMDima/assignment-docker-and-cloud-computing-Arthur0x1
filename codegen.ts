import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: "backend/schema.graphql",
  generates: {
    "backend/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        // NOTE: this file path starts from the location of generated file
        contextType: "../index.ts#Context",
      },
    }
  }
}

export default config
