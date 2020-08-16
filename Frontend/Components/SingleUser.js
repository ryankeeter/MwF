import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SINGLE_USER_QUERY = gql`
    query SINGLE_USER_QUERY($id: ID!){
        user(where: {id: $id}){
            id
            name
            email
            smallImage
            largeImage
        }
    }
`;
export default class SingleUser extends Component {
    render() {
        return (
            <div>
                <Query
                query={SINGLE_USER_QUERY}
                variables={{id: this.props.id}}>
                    {({data, error, loading}) =>{
                        return(
                            <div>
                                Single User Component! with an Id of {data.user.id}
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
}
