import React from 'react';
import { empClient } from '../../axios/emp.client';
import { ReimStatusComponent } from '../reimStatus/ReimStatus.component';

export class ByStatusComponent extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            statChoice: 1,
            reimbursements: []
        }
    }

    async componentDidMount () {
        await this.getReims();
    }

    getReims = async () => {
        try {
            const res = await empClient('/reimbursements/status/' + this.state.statChoice);
            console.log(res.data);
            this.setState({
                reimbursements: res.data
            });
        } catch(err) {
            console.log(err);
        }
       
    }

    changeStatus = async (e) => {
        console.log(e.target.id);
        await this.setState({
            statChoice: +e.target.id
        });
        try {
            const res = await empClient('/reimbursements/status/' + this.state.statChoice);
            console.log(res.data);
            this.setState({
                reimbursements: res.data
            });
        } catch(err) {
            console.log(err);
        }
    }

  render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav pointerUl">
                        <li className={"nav-link "+(this.state.statChoice === 1 ? "active" : null)}>
                            <a className="nav-item" id="1" onClick={this.changeStatus}>Pending</a>
                        </li>
                        <li className={"nav-link "+(this.state.statChoice === 2 ? "active" : null)}>
                            <a className="nav-item" id="2" onClick={this.changeStatus}>Approved</a>
                        </li>
                        <li className={"nav-link "+(this.state.statChoice === 3 ? "active" : null)}>
                            <a className="nav-item" id="3" onClick={this.changeStatus}>Denied</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                <ReimStatusComponent 
                    status={this.state.statChoice} 
                    reims={this.state.reimbursements} 
                    getReims={this.getReims}
                    />
            </div>
      </div>
    );
  }

}