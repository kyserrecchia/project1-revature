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
            idEdit: 0
        }
    }

    patchReim = async (event) => {
        event.preventDefault(); // prevent default form submission
        await this.setState({
            body: {
                reimbursementId: +event.target.id,
                status: +event.target.value
            },
        })

        try {
            empClient.patch('/reimbursements', this.state.body);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState(this.state);
        }
    }

    edit = (e) => {
        this.setState({
            editing: true,
            idEdit: +(e.target.id-1)
        })
        console.log(e.target.id);

    }

    submit = (e) => {
        this.setState({
            editing: false,
            idEdit: +(e.target.id-2)
        })
        console.log(e.target.id);
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
                { 
                    this.props.status !== 1 ? 
                        this.props.reims.map(reim => { 
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
                            return <tr key={reim.reimbursementId}>{
                                        <>
                                        <th scope="row">{reim.reimbursementId}</th>
                                        <td>{reim.author}</td> 
                                        <td>{reim.dateSubmitted}</td>
                                        <td>{reim.dateResolved}</td>
                                        <td>{reim.amount}</td>
                                        <td>{reim.description}</td>
                                        <td>{reim.type}</td>
                                        {this.state.editing ?
                                            <td><select id={reim.reimbursementId} className="custom-select">
                                                <option value="1">Pending</option>
                                                <option value="2">Approved</option>
                                                <option value="3">Denied</option>
                                            </select>
                                            </td>
                                            : <td>{reim.status}</td>
                                        } 
                                        <td>{reim.resolver}</td>
                                        { !this.state.editing ? 
                                            <td>
                                                <button className="btn btn-dark" 
                                                    id={reim.reimbursementId+1} onClick={this.edit}>
                                                    Edit
                                                </button>
                                            </td>   
                                            : 
                                            <td>
                                                <button className="btn btn-dark" 
                                                    id={reim.reimbursementId+2} onClick={this.submit}>
                                                    Submit
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