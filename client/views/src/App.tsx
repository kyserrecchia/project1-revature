import React, { Component } from 'react';
import './App.css';
import './include/Bootstrap';
import { NavComponent } from './components/nav/Nav.component';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { SignInComponent } from './components/sign-in/SignIn.component';
import { ProfileComponent } from './components/profile/Profile.component';
import { ReimComponent } from './components/reim/Reim.component';
    import { MyReimComponent } from './components/myReim/myReim.component';
    import { ReimStatusComponent } from './components/reimStatus/ReimStatus.component';
    import { ReimUserComponent } from './components/reimUser/ReimUser.component';
    import { SubmitReimComponent } from './components/submitReim/SubmitReim.component';
import { UsersComponent } from './components/users/Users.component';
import { url } from 'inspector';

class App extends Component<any, any> {

    constructor(props) {
        super(props);
    
        this.state = {
            loggedIn: false,
            username: null,
            password: null, 
            role: null
        }
    }

    login = (username, password, role) => {
        this.setState({
            loggedIn: true,
            username,
            password,
            role
        });


    }

    render() {
        return (
            <div className='background'>
            <BrowserRouter>
                <div>
                    <NavComponent  state={this.state}/>
                    <div id='app-content-container'>
                        <Route path='/sign-in' render={(props) => <SignInComponent {...props} login={this.login}/>} />
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
            </div>
        );
    }
}

export default App;
