import { ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client';

//Midleware i hiwalay sa ibang files kapag dumami
const authLink = new ApolloLink((operation, forward) => {
    // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null //check first if we are on browser environment

    //make sure the headers is always an object 
    operation.setContext(({headers = {}}) => ({

        headers: {
            ...headers,
            Authorization: `Bearer UwU` //UwU for now
            // Authorization: token ? `Bearer ${token}` : "" ,
        },
    }));

    return forward(operation)
});

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:3000/api/graphql" //endpoint :>
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client

