import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
    {
        usersPage(count: 3) {
            data {
                id
                name
                email
            }
        }
    }
`

const User = () => (
    <Query query={query}>
        {({loading, error, data}) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>Error :{error.toString()}</p>;

            return data.usersPage.data.map(({id, name, email}) => (
                <div key={id}>
                    <p>name: {name}</p>
                    <p>email: {email}</p>
                </div>
            ));
        }}
    </Query>
);

export default User;
