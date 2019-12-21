import React from 'react'
import {Label, Input, Button} from 'reactstrap'
import Cookies from 'js-cookie'

class WriteReplies extends React.Component {
    constructor() {
        super();
        this.state = {
            messageContent: ""
        }
    }

    onInputChange = (event) => {
        this.setState({messageContent: event.target.value})
    }
    saveReply = () => {
        const cookie = Cookies.get('authorization');
        const messageCookie = Cookies.get('messageid')
        if(this.state.messageContent === "") {
            alert("Please Update Message")
            return
        }
        fetch('http://localhost:3000/reply', {
            method: 'post',
            headers : {'authorization': cookie, 'content-type': 'application/json', 'messageid': messageCookie},
            body: JSON.stringify({
                content: this.state.messageContent
            })
        })
        .then(resp => resp.json())
        .then(console.log)
        .catch(err => console.log(err))
    }

    onBackClick = () => {
        this.props.onRouteChange('Replies');
    }

    componentDidMount() {
        Cookies.set('page','WriteReplies')
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
                    <Button onClick={this.saveReply} className="btn-lg"color="success">Save Message</Button>
                    <Button style={{margin:'auto'}} onClick={this.onBackClick} className="btn-sm"color="secondary">Back</Button>
                </div>
                
            </div>
        )
    }
}

export default WriteReplies