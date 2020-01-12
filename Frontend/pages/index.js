import React, { Component } from "react";
import Link from "next/link";
import Users from "../Components/Users";

class Home extends Component {
  render() {
    return (
      <div>
        <Link href="./createUser">
          <a>Create User</a>
        </Link>
        <Users />
      </div>
    );
  }
}

export default Home;
