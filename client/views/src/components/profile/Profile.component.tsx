import React from 'react';
import { empClient } from '../../axios/emp.client';

export class ProfileComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: this.props.state.username,
            firstName: null,
            lastName: null,
            email: null,
            role: this.props.state.role
        };
    }

    showProfile = async () => {
        try {
            const res = await empClient('/users/name/' + this.state.username);
            console.log(res.data);
            const { userId, firstName, lastName, email} = res.data;
            this.setState({
                ...this.state,
                id: userId,
                firstName: firstName,
                lastName: lastName,
                email: email
            })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount(){
        this.showProfile();
    }

  render() {
    return (
      <div>
        Profile      
        <table className='table'>
                <thead>
                    <tr>
                        <th>Id #</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{this.state.id}</th>
                        <td>{this.state.username}</td>
                        <td>{this.state.firstName}</td>
                        <td>{this.state.lastName}</td>
                        <td>{this.state.email}</td>
                        <td>{this.state.role}</td>
                    </tr>
                </tbody>
            </table>
      </div>
    );
  }

}