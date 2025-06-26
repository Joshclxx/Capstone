import { ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client';
import { getAccessToken } from './token';
//Midleware i hiwalay sa ibang files kapag dumami
const authLink = new ApolloLink((operation, forward) => {
    const token = typeof window !== "undefined" ? getAccessToken() : null //check first if we are on browser environment

    //make sure the headers is always an object 
    operation.setContext(({headers = {}}) => ({

        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "" ,
        },
    }));

    return forward(operation)
});

// const errorLink = new ApolloLink((operation, forward) => {

// })

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:3000/api/graphql" //endpoint :>
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client

