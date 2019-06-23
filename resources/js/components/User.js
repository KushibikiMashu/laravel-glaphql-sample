import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const ErrorMessage = (e) => <p>Error: {e.toString()}</p>;

const query = gql`
    {
        usersOrderByWithPage(
            orderBy: [{field: "id", order: DESC}]
            count: 3
        ) {
            data {
                id
                name
                email
            }
        }
    }
`

const UserQuery = () => (
    <Query query={query}>
        {({loading, error, data}) => {
            if (loading) return <p>loading...</p>;
            if (error) return <ErrorMessage e={error}/>;

            return (
                <>
                    <hr/>
                    <h2>User List</h2>
                    {data.usersOrderByWithPage.data.map(({id, name, email}) => (
                        <div key={id}>
                            <p>id: {id}</p>
                            <p>name: {name}</p>
                            <p>email: {email}</p>
                        </div>
                    ))}
                </>
            );
        }}
    </Query>
);

const CREATE_USER = gql`
    mutation($name: String!, $email: String!, $password: String!) {
        createUser (name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
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
                        {error && <ErrorMessage error={error}/>}
                        {data && <>
                            <h3>Success!</h3>
                            <p>ID: {data.createUser.id}</p>
                            <p>Name: {data.createUser.name}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    )
}

const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!) {
        updateUser(id: $id, name: $name) {
            id
            name
        }
    }
`

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    return (
        <>
            <h2>Update</h2>
            <Mutation
                mutation={UPDATE_USER}
                variables={{id, name}}
            >
                {(updateUser, {loading, error, data}) => (
                    <>
                        <p>ID: <input type="number" onChange={e => setId(e.target.value)}/></p>
                        <p>New Name: <input type="text" onChange={e => setName(e.target.value)}/></p>
                        <button type="button" onClick={updateUser}>Updte</button>
                        {error && <ErrorMessage e={error}/>}
                        {data && <>
                            <h3>Success Update</h3>
                            <p>name: {data.updateUser.id}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    );
}

const DELETE_USER = gql`
    mutation ($id: ID!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`

const DeleteUser = () => {
    const [id, setId] = useState(0);

    return (
        <>
            <h2>Delete</h2>
            <Mutation
                mutation={DELETE_USER}
                variables={{id}}
            >
                {(deleteUser, {loading, error, data}) => (
                    <>
                        <p>ID: <input type="number" onChange={e => setId(e.target.value)}/></p>
                        <button type="button" onClick={deleteUser}>Delete</button>
                        {error && <ErrorMessage e={error}/>}
                        {data && <>
                            <h3>Success Delete</h3>
                            <p>ID: {data.deleteUser.id}</p>
                        </>
                        }
                    </>
                )}
            </Mutation>
        </>
    )
};

const User = () => (
    <div>
        <UserQuery />
        <hr/>
        <CreateUser/>
        <hr/>
        <UpdateUser/>
        <hr/>
        <DeleteUser/>
    </div>
);

export default User;
