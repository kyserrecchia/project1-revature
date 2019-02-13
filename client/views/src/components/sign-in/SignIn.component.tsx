import React from 'react';
import { RouteComponentProps } from 'react-router';
import { empClient } from '../../axios/emp.client';

interface ISignInState {
  credentials: {
    username: string,
    password: string
  };
  errorFeedback: string;
}

interface ISignInProps extends RouteComponentProps<{}> {

}

export class SignInComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            errorFeedback: ''
        };
    }

    updateUsername = (event) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                username: event.target.value
            }
        });
    }

    updatePassword = (event) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                password: event.target.value
            }
        });
    }

    signIn = async (event) => {
        event.preventDefault(); // prevent default form submission
        try {
            const res = await empClient.post('/login', this.state.credentials);
            // console.log(res);
            let { userId, role } = res.data;
            let { username, password } = this.state.credentials;
            this.props.login(userId, username, password, role);
            this.props.history.push('/');
        } catch (err) {
            console.log(err);
            this.setState({
                errorFeedback: 'failed to sign in'
            });
        }
    }

  render() {
    const { credentials, errorFeedback } = this.state;
    return (
        <form className='form-signin' onSubmit={this.signIn} >
            <img className='mb-4' src='/docs/4.2/assets/brand/bootstrap-solid.svg' alt='' width='72' height='72' />
            <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
            <label htmlFor='inputUsername' className='sr-only'>Username</label>
            <input type='text'
                id='inputUsername'
                className='form-control'
                placeholder='Username'
                value={credentials.username}
                onChange={this.updateUsername}
                required />
            <label htmlFor='inputPassword' className='sr-only'>Password</label>
            <input type='password'
                id='inputPassword'
                className='form-control'
                placeholder='Password'
                value={credentials.password}
                onChange={this.updatePassword}
                required />
            <p id='error-message'>{errorFeedback}</p>
            <div className='checkbox mb-3'>
                <label>
                    <input type='checkbox' value='remember-me' /> Remember me
                </label>
            </div>
            <button className='btn btn-lg btn-dark btn-block' type='submit'>Sign in</button>
            <p className='mt-5 mb-3 text-muted'>&copy; 2017-2018</p>
        </form>
    );
  }

}