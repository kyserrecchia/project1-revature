import React from 'react';
// import './include/Bootstrap';

export class MyReimComponent extends React.Component {

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
                    <tr>
                        <th scope="row">1</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }

}