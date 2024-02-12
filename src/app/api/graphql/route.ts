import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { NextRequest } from "next/server";
import { join } from "path";

import { resolvers } from "@gql/resolvers";

import prisma from "../../../../prisma/db";

const schema = loadSchemaSync(
  join(__dirname, "../../../../../graphql/schema.gql"),
  {
    loaders: [new GraphQLFileLoader()],
  },
);

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, prisma }),
});

export { handler as GET, handler as POST };
