import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://trusting-parrot-39.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret' : '3NAPuchJ0v0NsJz475c7bs3n2qIWTuWzSKjW05pX9Warwnp2U0VOWxlFdt5ueUz1'
    }
})

export default client;