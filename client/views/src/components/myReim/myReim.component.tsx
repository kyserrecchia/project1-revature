import React from 'react';
// import './include/Bootstrap';
import { empClient } from '../../axios/emp.client';

export class MyReimComponent extends React.Component<any, any> {

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
            const res = await empClient.get('/reimbursements/author/userId/' + this.state.userId);
            // console.log(res.data);
            this.setState({
                reimbursements: res.data
            });
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
            My Reimbursements
        <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Id #</th>
                        <th scope="col">Date Submitted</th>
                        <th scope="col">Date Resolved</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Resolver</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.reimbursements.map(reim => { 
                        return <tr key={reim.reimbursementId}>{
                            <>
                            <th scope="row">{reim.reimbursementId}</th>
                            <td>{reim.dateSubmitted}</td>
                            <td>{reim.dateResolved}</td>
                            <td>{reim.amount}</td>
                            <td>{reim.description}</td>
                            <td>{reim.type}</td>
                            <td>{reim.status}</td>
                            <td>{reim.resolver}</td>
                            </>
                        }</tr>
                    })}
                </tbody>
            </table>
        </div>
    );
  }

}