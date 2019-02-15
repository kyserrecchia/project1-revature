import React from 'react';
import { empClient } from '../../axios/emp.client';

export class ReimUserComponent extends React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            userId: this.props.state.id,
            reimbursements: [],
            editing: false
        };
    }

    getReimbursements = async () => {
        try {
            const res = await empClient('/reimbursements');
            console.log(res);
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

    edit = (e) => {
        console.log(e.target.data);
        this.setState({
            editing: true
        });
    }
    
    submit = () => {

        this.setState({
            editing: false
        });
    }

    render() {
        return (
            <div>
                Reimbursements
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
                    {
                        this.state.reimbursements.map(reim => { 
                            reim.dateSubmitted = new Date(reim.dateSubmitted*1000).toLocaleDateString();
                            reim.dateResolved = reim.dateResolved !== 0 ? new Date(reim.dateResolved*1000).toLocaleDateString() : 'NA';
                            reim.resolver = reim.dateResolved !== 'NA' ? reim.resolver : 'NA';
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
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}