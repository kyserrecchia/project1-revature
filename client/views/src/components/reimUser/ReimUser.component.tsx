import React from 'react';
import { empClient } from '../../axios/emp.client';

export class ReimUserComponent extends React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            userId: this.props.state.id,
            reimbursements: []
        };
    }

    getReimbursements = async () => {
        const { userId } = this.props.state;
        try {
            const res = await empClient('/reimbursements/author/userId/' + userId);
            console.log(res);

        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.getReimbursements();
    }

    render() {
        return (
            <div>
                Reimbursements By User
        <table className='table'>
                    <thead>
                        <tr>
                            <th>Id #</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Submitted</th>
                            <th>Date Resolved</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Resolver</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}