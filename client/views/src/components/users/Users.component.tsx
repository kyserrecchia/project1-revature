import React from 'react';
import { withRouter } from 'react-router-dom';
import { any } from 'prop-types';
import { empClient } from '../../axios/emp.client';

export class UsersComponent extends React.Component<any, any> {
    
    constructor(props){
        super(props);
        this.state = {
            users: [],
            userId: null
        };
    }

    getReimbursements = async () => {
        try {
            const res = await empClient('/users');
            console.log(res.data);
            this.setState({
                users: res.data
            });
        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.getReimbursements();
    }

    handleClick = (e) => {
        let userId = e.target.innerText;
        this.setState({
            userId: userId
        })
        // let path = `newPath`;
        // this.props.history.push(path);
    }

  render() {
    return (
      <div>
        Users
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
                {this.state.users.map(user => { 
                        return <tr key={user.userId}>{
                            <>
                            <th scope="row" onClick={this.handleClick}>{user.userId}</th>
                            <td>{user.username}</td> 
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            </>
                        }</tr>
                 })}
                </tbody>
            </table>
      </div>
    );
  }

}