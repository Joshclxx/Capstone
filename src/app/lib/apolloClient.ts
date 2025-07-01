import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable} from '@apollo/client';
import { getAccessToken, setAccessToken } from './token';
import {onError} from "@apollo/client/link/error"
import { refreshAccessToken } from './refreshAccessToken';

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

const errorLink = onError(({graphQLErrors, operation, forward}) => {
    if(graphQLErrors?.some(err => err.extensions?.code === "UNAUTHENTICATED")) {
        return new Observable(observer => {
            refreshAccessToken() 
            .then(newAccessToken => {
                setAccessToken(newAccessToken);
                operation.setContext(({headers = {}}) => ({
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                }));

                forward(operation).subscribe(observer);

            })
            .catch(err => {
                console.error(err);
                observer.error(err)
            })
            
        })
    }

})

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:3000/api/graphql", //endpoint :>
    credentials: "include",
})
const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
})

export default client

