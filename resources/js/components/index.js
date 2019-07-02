import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import User from './User'
import Error from "./Error";

const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/graphql",
    onError: ({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
            graphQLErrors.map(({message, locations, path}) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        }

        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }
});

const App = () => (
    <ApolloProvider client={client}>
        <User/>
        <Error/>
    </ApolloProvider>
);

render(
    <App/>,
    document.getElementById('root')
);
