import React, { Component } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "./ErrorMessage";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
class CreateUser extends Component {
  state = {
    name: "",
    email: ""
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  render() {
    return (
      <div>
        <Mutation mutation={CREATE_USER_MUTATION} variables={this.state}>
          {(createUser, { loading, error, data }) => (
            <form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createUser();
                Router.push({
                  pathname: "/user",
                  query: { id: res.data.createUser.id }
                });
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
                    value={this.state.name}
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
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Create User</button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateUser;
export { CREATE_USER_MUTATION };
