import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, Observable} from '@apollo/client';
import { getAccessToken, setAccessToken } from './token';
import {onError} from "@apollo/client/link/error"

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
            fetch('/api/graphql', {
                method: "POST",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query: `mutation {refreshToken {accessToken}}`,
                }),
            })
            .then(res => res.json())
            .then(({data}) => {
                const newAccessToken = data?.refreshToken?.accessToken;
                if(!newAccessToken) throw new Error('No token');
                setAccessToken(newAccessToken);

                operation.setContext(({ headers = {}}) => ({
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    }
                }));

                return forward(operation).subscribe(observer)
            })
            .catch(observer.error)
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

