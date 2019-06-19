import React from 'react';
import { render } from 'react-dom';
import ApolloClient, {gql} from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import User from './User'
import Error from "./Error";

const client = new ApolloClient({
    uri: "http://127.0.0.1:8001/graphql"
})

const App = () => (
    <ApolloProvider client={client}>
        <User/>
        <Error />
    </ApolloProvider>
)

render(
    <App />,
    document.getElementById('root')
)
