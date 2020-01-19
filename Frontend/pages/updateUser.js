import React, { Component } from "react";
import UpdateUser from "../Components/UpdateUser";

class updateUser extends Component {
  render() {
    return (
      <div>
        <UpdateUser id={this.props.query.id} />
      </div>
    );
  }
}

export default updateUser;
