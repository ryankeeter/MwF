import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
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
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
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
