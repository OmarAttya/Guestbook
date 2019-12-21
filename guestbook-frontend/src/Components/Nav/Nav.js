import React from 'react';
import Cookies from 'js-cookie'
//import './signOutFunction'
import {Button} from 'reactstrap'


class Navigation extends React.Component  {
    constructor(props) {
        super();
    }
    onSignOut = () => {
        Cookies.remove('page')
        const cookie = Cookies.get('authorization')
        fetch('http://localhost:3000/users/logout', {
            method: 'delete',
            headers: {'authorization': cookie}
        })
        .then(response => {
            Cookies.remove('authorization')
            Cookies.remove('messageid')
        })
        .then(
        this.props.onRouteChange('signout')
        )
    }
    onSignIn = () => {
        this.props.onRouteChange('Login')
    }
    onRegister = () => {
        this.props.onRouteChange('Register')
    }
    
    render () {
        if(this.props.isSignedIn) {
            return (
                <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button style={{color: 'black'}}onClick = {this.onSignOut} color="link">Sign Out</Button>
                </div>
            )   
        } else {
            return (
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button style={{color: 'black'}} onClick = {this.onSignIn} color="link">Sign in</Button>
                    <Button style={{color: 'black'}} onClick = {this.onRegister} color="link">Register</Button>
                </div>
            )
        }
    }
}

export default Navigation;