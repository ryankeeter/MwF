import React, { Component } from 'react'
import SingleUser from '../Components/SingleUser';

export default class User extends Component {
    render() {
        return (
            <div>
                <p>Single User! Id: {this.props.query.id}</p>
                <SingleUser id={this.props.query.id}/>
            </div>
        )
    }
}
