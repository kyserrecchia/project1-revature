import React from 'react';
import { User } from '../../models/user';
import { pokeClient } from '../../axios/poke.client';

interface HomeComponentState {
  users: User[]
}

export class HomeComponent extends React.Component<any, HomeComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount = async () => {
    try {
      const resp = await pokeClient.get('/users');
      this.setState({
        users: resp.data
      })
    } catch (err) {
      console.log(err);
    } 
  }

  render() {
    return (
      <table className="table">
        <thead className="gradient-background">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="restaurant-table-body">
          {
            this.state.users.map(user => (
              <tr key={'user-row' + user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td className="delete-button">delete</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }

}