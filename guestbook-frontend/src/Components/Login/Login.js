import React from 'react';
import Cookies from 'js-cookie'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }
    componentDidMount () {
     
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmitLogin = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
              })
            })
            .then(response => response.json())
              .then(data => {
            if(data.data==='success') {
              Cookies.set('authorization', "Bearer " + data.token)
              this.props.onRouteChange('Home');
            }
        })
    }
  render() {
    const {onRouteChange} = this.props;
    return (
      <Form className="form">
        <h1>
          <span className="font-weight-bold">Guestbook</span>.com
          </h1>
          <h2 className="text-center">Welcome</h2>
          <h5 className="text-center">Please Sign in</h5>
          <FormGroup>
            <Label>Email</Label>
            <Input onChange = {this.onEmailChange} type="email" placeholder="Email"/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input onChange = {this.onPasswordChange} type="password" placeholder="Password"/>
          </FormGroup>
          
          <Button onClick = {this.onSubmitLogin} className="btn-lg btn-dark btn-block">Login</Button>
          <div className="text-center">
          <Button style={{color: 'black'}} color="link" onClick = {() => onRouteChange('Register')} >Register</Button>
          </div>
      </Form>
    )
  }
}

export default Login;
