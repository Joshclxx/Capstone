import { ApolloServer } from "@apollo/server";
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { typeDefs } from "@/app/graphql/typeDefs";
import { resolvers } from "@/app/graphql/resolvers";
import { createContext, GraphQLContext } from "@/app/lib/context";
import { NextRequest, NextResponse } from "next/server";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: process.env.NODE_ENV === 'production' ? [ApolloServerPluginLandingPageLocalDefault()] : []
})

const handler = startServerAndCreateNextHandler<NextRequest, GraphQLContext>(server, {
    context: async (req) => {
        const res = new NextResponse()
        return await createContext(req, res)
    }
})

export async function GET(req: NextRequest){ //NextRequest kapag app routing app/ && NextApiRequest kapag page router pages/
    return handler(req)
}

export async function POST(req: NextRequest){
    return handler(req)
}