import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {gql} from 'apollo-boost'
import App from './App'

const client = new ApolloClient({
    uri: "http://127.0.0.1:8001/graphql"
})

client
    .query({
        query: gql`
            {
              users {
                id
                name
                email
              }
            }
        `
    })

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
