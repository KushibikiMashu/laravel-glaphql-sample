import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
    {
        usersPage(count: 5) {
            data {
                id
                name
                email
            }
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
const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!) {
        updateUser(id: $id, name: $name) {
            id
            name
        }
    }
`

const DELETE_USER = gql`
    mutation ($id: ID!) {
        deleteUser(id: $id) {
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
    const [updateName, setUpdateName] = useState('');
    const [updateId, setUpdateId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);

    return (
        <Query query={query}>
            {({loading, error, data}) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>Error :{error.toString()}</p>;

                return (
                    <>
                        <hr/>
                        <h2>User List</h2>
                        {data.usersPage.data.map(({id, name, email}) => (
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
                                <>
                                    <button type="button" onClick={createUser}>Register</button>
                                    {error && <p>{error.toString()}</p>}
                                    {data && <>
                                        <h3>Success!</h3>
                                        <p>ID: {data.createUser.id}</p>
                                        <p>Name: {data.createUser.name}</p>
                                    </>
                                    }
                                </>
                            )}
                        </Mutation>

                        <hr/>
                        <h2>Update</h2>
                        <Mutation
                            mutation={UPDATE_USER}
                            variables={{id: updateId, name: updateName}}
                        >
                            {(updateUser, {loading, error, data}) => (
                                <>
                                    <p>ID: <input type="number" onChange={e => setUpdateId(e.target.value)}/></p>
                                    <p>New Name: <input type="text" onChange={e => setUpdateName(e.target.value)}/></p>
                                    <button type="button" onClick={updateUser}>Updte</button>
                                    {error && <p>{error.toString()}</p>}
                                    {data && <>
                                        <h3>Success Update</h3>
                                        <p>name: {data.updateUser.id}</p>
                                    </>
                                    }
                                </>
                            )}
                        </Mutation>

                        <hr/>
                        <h2>Delete</h2>
                        <Mutation
                            mutation={DELETE_USER}
                            variables={{id: deleteId}}
                        >
                            {(deleteUser, {loading, error, data}) => (
                                <>
                                    <p>ID: <input type="number" onChange={e => setDeleteId(e.target.value)}/></p>
                                    <button type="button" onClick={deleteUser}>Delete</button>
                                    {error && <p>{error.toString()}</p>}
                                    {data && <>
                                        <h3>Success Delete</h3>
                                        <p>ID: {data.deleteUser.id}</p>
                                    </>
                                    }
                                </>
                            )}
                        </Mutation>
                    </>
                );
            }}
        </Query>
    );
};

export default User;
