import React from 'react';
import './Register.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: ""
    }
  }
  onNameChange = (event) => {
    this.setState({registerName: event.target.value})
  } 
  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  } 
  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  } 
  onRegister = () => {
    fetch('http://localhost:3000/users/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
    .then(() => {
      this.props.onRouteChange('Login');
    })
  }
  render() {
    return (
      <Form className="form">
        <h1>
          <span className="font-weight-bold">Guestbook</span>.com
          </h1>
          <h2 className="text-center">Welcome</h2>
          <h5 className="text-center">Please Register</h5>
          <FormGroup>
            <Label>Name</Label>
            <Input onChange = {this.onNameChange} type="text" placeholder="Name"/>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input onChange = {this.onEmailChange} type="email" placeholder="Email"/>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input onChange = {this.onPasswordChange} type="password" placeholder="Password"/>
          </FormGroup>
          
          <Button onClick = {this.onRegister} className="btn-lg btn-dark btn-block">Register</Button>
      </Form>
    )
  }
}

export default Register;
