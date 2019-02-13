import React from 'react';
import { empClient } from '../../axios/emp.client';

export class ReimStatusComponent extends React.Component<any, any> {

  render() {
    return (
      <div>
        Reimbursements By Status        
        <table className='table'>
                <thead>
                    <tr>
                        <th>Id #</th>
                        <th>Username</th>
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
                { this.props.reims.map(reim => { 
                        return <tr key={reim.reimbursementId}>{
                            <>
                            <th scope="row">{reim.reimbursementId}</th>
                            <td>{reim.author}</td> 
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