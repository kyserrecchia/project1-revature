import React from 'react';
import { any } from 'prop-types';

export class SubmitReimComponent extends React.Component<any, any> {

  render() {
    return (
        <div>
            Submit Reimbursement
            <form action='/reimbursements/submit' method='post'>
                <label htmlFor='description'>Description</label>
                <input type='text' name='description' /><br />
                <label htmlFor='amount'>Amount</label>
                <input type='number' step='.01' min='.01' name='amount' /><br />
                <label htmlFor='type'>Type</label>
                <select name='type'>
                    <option value='1' selected={true}>Lodging</option>
                    <option value='2'>Travel</option>
                    <option value='3'>Food</option>
                    <option value='4'>Other</option>
                </select>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
  }

}