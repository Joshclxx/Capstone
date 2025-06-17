import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { typeDefs } from "@/app/graphql/typeDefs";
import { resolvers } from "@/app/graphql/resolvers";
import { context } from "@/app/lib/context";
import { NextRequest } from "next/server";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server, {
    context: async () => context //no auth for now
})

export async function GET(req: NextRequest){
    return handler(req)
}

export async function POST(req: NextRequest){
    return handler(req)
}