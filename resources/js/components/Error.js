import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
    {
        user
    }
`

const Error = () => (
    <Query query={query}>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.toString()}</p>;

            return <>Error Component</>
        }}
    </Query>
);

export default Error;