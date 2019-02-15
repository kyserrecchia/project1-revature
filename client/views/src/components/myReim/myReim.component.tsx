import React from 'react';
// import './include/Bootstrap';
import { empClient } from '../../axios/emp.client';

export class MyReimComponent extends React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            reimbursements: [],
            form: {
                userId: this.props.state.id,
                amount: '',
                description: '',
                type: ''
            }
        };
    }

    getReimbursements = async () => {
        try {
            const res = await empClient.get('/reimbursements/author/userId/' + this.state.form.userId);
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

    
    updateAmount = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                amount: event.target.value
            }
        });
    }

    updateDescription = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                description: event.target.value
            }
        });
    }

    updateType = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                type: event.target.value
            }
            // errorInput: true
        });
    }


    submit = async (event) => {
            event.preventDefault(); // prevent default form submission
            try {
                await empClient.post('/reimbursements/submit', this.state.form);
                // console.log(res.data);
                this.state = {
                    form: {
                        ...this.state.form,
                        amount: '',
                        description: '',
                        type: ''
                    }
                };
                this.getReimbursements();
                
            } catch (err) {
                console.log(err);
            }
            
    }

  render() {
      const { form } = this.state;
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
                        reim.dateSubmitted = new Date(reim.dateSubmitted*1000).toLocaleDateString();
                        reim.dateResolved = reim.dateResolved !== 0 ? new Date(reim.dateResolved*1000).toLocaleDateString() : 'NA';
                        reim.resolver = reim.dateResolved !== 'NA' ? reim.resolver : 'NA';
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
            <form id="subForm" onSubmit={this.submit}>
                <div className="form-row">
                    <div className="col-3">
                        {/*  empty for spacing */}
                    </div>
                    <div className="col-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Description"
                            value={form.description}
                            onChange={this.updateDescription}
                            required
                        />
                    </div>
                    <div className="col-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Amount"
                            value={form.amount}
                            onChange={this.updateAmount}
                            required
                        />
                    </div>
                    <div className="col-2">
                            <select 
                                className="custom-select mr-sm-2" 
                                id="inlineFormCustomSelect"
                                value={form.type}
                                onChange={this.updateType}
                                required
                            >
                                    <option value="0">Type: </option>
                                    <option value="1">Lodging</option>
                                    <option value="2">Travel</option>
                                    <option value="3">Food</option>
                                    <option value="4">Other</option>
                            </select>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-dark mb-2">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
  }

}