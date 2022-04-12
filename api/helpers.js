import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/gdlvgw0n17wb/',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_KEY}`
    }
});