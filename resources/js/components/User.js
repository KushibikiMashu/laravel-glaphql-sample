import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
    {
        users {
            id
            name
            email
        }
    }
`

const CREATE_USER = gql`
    mutation($name: String, $email: String, $password: String) {
        createUser (name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const User = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Query query={query}>
            {({loading, error, data}) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>Error :{error.toString()}</p>;

                return (
                    <>
                        <hr/>
                        <h2>Users(all)</h2>
                        {data.users.map(({id, name, email}) => (
                            <div key={id}>
                                <p>name: {name}</p>
                                <p>email: {email}</p>
                            </div>
                        ))}
                        <hr/>
                        <h2>Create</h2>
                        <div>
                            <p>name:{` `}<input type="text" onChange={e => setName(e.target.value)}/></p>
                            <p>email:{` `}<input type="text" onChange={e => setEmail(e.target.value + '@gmail.com')}/>:@gmail.com
                            </p>
                            <p>password:{` `}<input type="text" onChange={e => setPassword(e.target.value)}/></p>
                        </div>
                        <Mutation
                            mutation={CREATE_USER}
                            variables={{name, email, password}}
                        >
                            {(createUser, {loading, error, data}) => (
                                <button onClick={createUser}>Register</button>
                            )}
                        </Mutation>
                    </>
                );
            }}
        </Query>
    );
};

export default User;
