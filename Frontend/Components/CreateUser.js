import React, { Component } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $smallImage: String
    $largeImage: String
  ) {
    createUser(
      name: $name
      email: $email
      smallImage: $smallImage
      largeImage: $largeImage
    ) {
      id
      name
      email
    }
  }
`;

const UserAvatar = styled.img`
  width: 150px;
`;
class CreateUser extends Component {
  state = {
    name: "Foo Bunker",
    email: "foo.bunker@gmail.com",
    smallImage:
      "https://res.cloudinary.com/creatively-forged/image/upload/v1578887476/MwF_User_Images/fmdkngvq5mbb8rfb4hyy.jpg",
    largeImage:
      "https://res.cloudinary.com/creatively-forged/image/upload/c_scale,w_500/v1578887476/MwF_User_Images/fmdkngvq5mbb8rfb4hyy.jpg"
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "MwF_User_Images");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/creatively-forged/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    this.setState({
      smallImage: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
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
                  Upload an Avatar Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload Avatar"
                    onChange={this.uploadFile}
                  />
                  {this.state.smallImage && (
                    <UserAvatar
                      src={this.state.smallImage}
                      alt={this.state.name}
                    />
                  )}
                </label>
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
