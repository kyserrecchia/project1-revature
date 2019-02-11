import React, { Component } from 'react';
import './App.css';
import './include/Bootstrap';
import { NavComponent } from './components/nav/Nav.component';
import { BrowserRouter, Route } from 'react-router-dom';
import { SignInComponent } from './components/sign-in/SignIn.component';
import { ProfileComponent } from './components/profile/Profile.component';
import { ReimComponent } from './components/reim/Reim.component';
    import { MyReimComponent } from './components/myReim/myReim.component';
    import { ReimStatusComponent } from './components/reimStatus/ReimStatus.component';
    import { ReimUserComponent } from './components/reimUser/ReimUser.component';
    import { SubmitReimComponent } from './components/submitReim/SubmitReim.component';
import { UsersComponent } from './components/users/Users.component';
import { url } from 'inspector';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <NavComponent />
                <div id='app-content-container' className='black-border'>
                    <Route path='/sign-in' component={SignInComponent} />
                    <Route path='/profile' component={ProfileComponent} />
                    <Route path='/reim' component={ReimComponent} />
                    <Route path='/users' component={UsersComponent} />
                    <Route path='/my' component={MyReimComponent} />
                    <Route path='/by-status' component={ReimStatusComponent} />
                    <Route path='/by-user' component={ReimUserComponent} />
                    <Route path='/submit' component={SubmitReimComponent} />
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
