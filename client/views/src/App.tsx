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
import { UsersComponent } from './components/users/Users.component';
import { url } from 'inspector';
import { ByStatusComponent } from './components/byStatus/ByStatus.component';

class App extends Component<any, any> {

    constructor(props) {
        super(props);
    
        this.state = {
            loggedIn: false,
            id: null,
            username: 'Jerry Garcia',
            password: null, 
            role: null
        }
    }

    login = (id, username, password, role) => {
        this.setState({
            loggedIn: true,
            id,
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
                        <Route path='/profile' render={(props) => <ProfileComponent {...props} state={this.state}/>} />
                        <Route path='/reim' render={(props) => <ReimComponent {...props} state={this.state}/>} />
                        <Route path='/users' render={(props) => <UsersComponent {...props} state={this.state}/>} />
                        <Route path='/my' render={(props) => <MyReimComponent {...props} state={this.state}/>} />
                        <Route path='/by-status' render={(props) => <ByStatusComponent {...props} state={this.state}/>} />
                        <Route path='/by-user' render={(props) => <ReimUserComponent {...props} state={this.state}/>} />
                    </div>
                </div>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
