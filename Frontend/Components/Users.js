import React, { Component } from "react";
import gql from "graphql-tag";
import Link from "next/link";
import { Query } from "react-apollo";

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      smallImage
      largeImage
    }
  }
`;

class Users extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_USERS_QUERY}>
          {({ data, error, loading }) => {
            return (
              <div>
                {data.users.map(user => (
                  <div key={user.id}>
                    <img src={user.smallImage} alt={user.name} />
                    <Link href={{pathname: "./user", query: {id: user.id}}}><a>{user.name}</a></Link>
                    <h2>{user.email}</h2>
                    <Link
                      href={{
                        pathname: "./updateUser",
                        query: { id: user.id }
                      }}
                    >
                      <a>Edit User</a>
                    </Link>
                    <button>Delete User</button>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Users;
export { ALL_USERS_QUERY };
