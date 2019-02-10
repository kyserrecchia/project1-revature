import React from 'react';
import { Link } from 'react-router-dom';
import CapsuleCorpLogo from '../../assets/capsule-corp-logo.jpg';

export class NavComponent extends React.Component {
  render() {
    return (
        <nav className='navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad'>
            <div className='navbar-header c-pointer shift-left'>
                <Link to='/home' className='unset-anchor'>
                    <img className='img-adjust-position rev-logo' src={CapsuleCorpLogo} alt='capsule-corp' />
                </Link>
            </div>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarsExample04' aria-controls='navbarsExample04' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarsExample04'>
                <ul className='navbar-nav ml-auto margin-nav'>
                    <li className='nav-item active'>
                        <Link to='/home' className='unset-anchor nav-link'>Home</Link>
                    </li>
                    <li className='nav-item active'>
                        <Link to='/profile' className='unset-anchor nav-link'>Profile</Link>
                    </li>
                    <li className='nav-item active dropdown'>
                        <a className='nav-link dropdown-toggle pointer' id='examples-dropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Reimbursements</a>
                        <div className='dropdown-menu' aria-labelledby='examples-dropdown'>
                            <div className='dropdown-item'><Link to='/my' className='unset-anchor nav-link active'>My Reimbursements</Link></div>
                            <div className='dropdown-item'><Link to='/submit' className='unset-anchor nav-link active'>Submit</Link></div>
                            <div className='dropdown-item'><Link to='/by-status' className='unset-anchor nav-link active'>By Status</Link></div>
                            <div className='dropdown-item'><Link to='/by-user' className='unset-anchor nav-link active'>By User</Link></div>
                        </div>
                    </li>
                    <li className='nav-item active'>
                        <Link to='/users' className='unset-anchor nav-link'>Users</Link>
                    </li>
                    <li className='nav-item active'>
                        <Link to='/logout' className='unset-anchor nav-link'>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
}