import React, { Component } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      email
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const UserAvatar = styled.img`
  width: 150px;
`;
class UpdateUser extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          //TODO: if no variable passed, what do we do?
          return (
            <Mutation
              mutation={UPDATE_USER_MUTATION}
              variables={{ id: this.props.id, ...this.state }}
            >
              {(updateUser, { loading, error }) => (
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    const res = await updateUser();
                  }}
                >
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Johnny McFace"
                        required
                        defaultValue={data.user.name}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="email">
                      Email
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="JohnnyMcEmail@email.com"
                        required
                        defaultValue={data.user.email}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </form>
              )}
            </Mutation>
          ); //end of the Query return
        }}
      </Query>
    );
  }
}

export default UpdateUser;
export { UPDATE_USER_MUTATION };
