import React from 'react';
import { empClient } from '../../axios/emp.client';

export class ReimStatusComponent extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            body: {
                reimbursementId: 3,
                status: 2
            },
            status: 1,
            editing: false,
            val: 0
        }
    }

    edit = (e) => {
        this.setState({
            editing: true,
            body: {
                reimbursementId: +(e.target.id-1)
            }
        })

    }

    submit = async (e) => {
        e.preventDefault(); // prevent default form submission
        this.setState({
            editing: false
        })
        await this.setState({
            body: {
                reimbursementId: +(e.target.id-2),
                status: this.state.val
            },
        })

        try {
            empClient.patch('/reimbursements', this.state.body).then(
                ()=> {
                    this.props.getReims();
                });
            
        } catch (err) {
            console.log(err);
        } 
    }

    getVal = (e) => {
        this.setState({
            val: +e.target.value
        })
    }

    componentDidUpdate() {
        if (this.props.status !== 1 && this.state.editing) {
            this.setState({
                editing: false
            })
        }
    }

    
  render() {
    return (
      <div>       
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
                    this.props.status !== 1 ? 
                        this.props.reims.map(reim => { 
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
                        : this.props.reims.map(reim => {
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
                                        {this.state.editing  && this.state.body.reimbursementId === +reim.reimbursementId ?
                                            <td><select id={reim.reimbursementId} 
                                                    onChange={this.getVal} className="custom-select">
                                                <option value="1">Pending</option>
                                                <option value="2">Approved</option>
                                                <option value="3">Denied</option>
                                            </select>
                                            </td>
                                            : <td>{reim.status}</td>
                                        } 
                                        <td>{reim.resolver}</td>
                                        { this.state.editing && this.state.body.reimbursementId === +reim.reimbursementId ?
                                            <td>
                                            <button className="btn btn-dark" 
                                                id={reim.reimbursementId+2} onClick={this.submit}>
                                                Submit
                                            </button>
                                            </td>  
                                            : 
                                            <td>
                                                <button className="btn btn-dark" 
                                                    id={reim.reimbursementId+1} onClick={this.edit}>
                                                    Edit
                                                </button>
                                            </td> 
                                        }</>
                                    }</tr>
                        })

                    } 
                </tbody>
            </table>
      </div>
    );
  }

}