import React from 'react'
import {Label, Input, Button} from 'reactstrap'
import Cookies from 'js-cookie'

class WriteMessage extends React.Component {
    constructor(props){
        super();
        this.state = {
            messageContent: ""
        }
    }

    componentDidMount () {
        Cookies.set('page', 'WriteMessage')
        const cookie = Cookies.get('messagecontent')
        if(cookie) {
            const textArea = document.getElementById('editPlaceHolder')
            textArea.value = cookie
        }
    }

    saveMessage = () => {
        const cookie = Cookies.get('authorization');
        const messageCookie = Cookies.get('messageid')
        if(this.state.messageContent === "") {
            alert("Please Write Message")
            return
        }
        if(!messageCookie)
        {
            console.log("NEW MESSAGE")
            fetch('http://localhost:3000/messages', {
                method: 'post',
                headers: {'authorization': cookie, 'content-type': 'application/json'},
                body: JSON.stringify({
                    content: this.state.messageContent 
                }) 
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.onRouteChange('Home');
            })
            .catch(err => console.log(err)) 
        } else {
            console.log("EDIT MESSAGE")
            fetch('http://localhost:3000/messages/', {
                method: 'put',
                headers: {'authorization': cookie, 'content-type': 'application/json', 'messageid': messageCookie},
                body: JSON.stringify({
                    content: this.state.messageContent
                })
            })
            .then(() => {
                Cookies.remove('messageid')
                Cookies.remove('messagecontent')
            })
        }
    }
    onInputChange = (event) => {
        this.setState({messageContent: event.target.value})
    }
    onBackClick = () => {
        Cookies.remove('messageid')
        Cookies.remove('messagecontent')
        this.props.onRouteChange('Home');
    }
    render() {
        return (
            <div>
                <h1 style={{paddingBottom: '25px'}} className="form">
                    <span className="font-weight-bold">Guestbook</span>.com
                </h1>
                <div style={{textAlign:'center', width:'55%', margin:'auto'}}>
                    <Label style={{fontWeight:'bold'}} for="exampleText">Please write your message here!</Label>
                    <Input id="editPlaceHolder" onChange={this.onInputChange} style={{paddingBottom:'50px'}} type="textarea" name="text" />
                    <Button onClick={this.saveMessage} className="btn-lg"color="success">Save Message</Button>
                    <Button style={{margin:'auto'}} onClick={this.onBackClick} className="btn-sm"color="secondary">Back</Button>
                </div>
                
            </div>
        )
    }
}

export default WriteMessage