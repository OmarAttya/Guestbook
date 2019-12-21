import React from 'react';
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import './Home.css'
import Cookies from 'js-cookie'


class Home extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            content: []
        }
    }
   
    componentDidMount() {
        Cookies.set('page','Home')
        const cookie = Cookies.get('authorization')
        console.log("WELCOME MESSAGES")
        fetch('http://localhost:3000/messages', {
            method: 'get',
            headers: {'authorization': cookie}
        })
        .then(response => response.json())
        .then(doc => {
            console.log('DOC', doc)
            this.setState({content: doc})
        })
        .catch(err => console.log(err))
    }
    onDeleteButton = (event) => {
        event.persist();
        const cookie = Cookies.get('authorization')
        // const messageId = event.target.id
        fetch('http://localhost:3000/messages/', {
            method: 'delete',
            headers: {'authorization': cookie, 'messageIndex': event.target.id},
        })
        .then(response => response.json())
        .then(() => {
            let messages = [] 
            messages = [...this.state.content]
            console.log('ID',event.target.id)
            const tmp = messages.filter((item) => {
                console.log('ITEM',item._id)
                console.log('RESULT', item._id !== event.target.id)
                return item._id !== event.target.id
            })
            this.setState({content:tmp})
            console.log('Messages',tmp)
        })
            .catch(err => console.log)
    }

    onEditButton = (event) => {
        let messages = [] 
        messages = [...this.state.content]
        const tmp = messages.filter((item) => {
            return item._id === event.target.id
        })
        Cookies.set('messageid', tmp[0]._id)
        Cookies.set('messagecontent', tmp[0].content)
        this.props.onRouteChange('WriteMessage');
    }

    onRepliesButton = (event) => {
        let messages = [] 
        messages = [...this.state.content]
        const tmp = messages.filter((item) => {
            return item._id === event.target.id
        })
        Cookies.set('messageid', tmp[0]._id)
        this.props.onRouteChange('Replies')
    }

    render() {
        const {onRouteChange} = this.props
        return (
            <div>
                 <h1 style={{paddingBottom: '25px'}} className="form">
                    <span className="font-weight-bold">Guestbook</span>.com
                </h1>
                <div style={{textAlign:'center', paddingBottom:'10px'}}>
                    <h2>Messages</h2>
                    <Button onClick={() => onRouteChange('WriteMessage')} color="primary">Write New Message</Button>
                </div>
                    <ListGroup className="list-group messageContainer">
                    {this.state.content.map((item, i) => {  
                        return <div className="center" key={i}>
                                    <div className="messageContainer container"> 
                                        <ListGroupItem  className="list-group-item messageContainer" >
                                            {item.content}
                                        </ListGroupItem>
                                    </div>
                                    <div className="messageContainer">
                                        <Button onClick={this.onEditButton} id={this.state.content[i]._id} className="btn-sm btn-blue button" color="secondary">Edit Message</Button>
                                        <Button onClick={this.onDeleteButton} id={this.state.content[i]._id} className="btn-sm btn-blue button" color="danger">Delete Message</Button>
                                        <Button onClick={this.onRepliesButton} id={this.state.content[i]._id} className="btn-sm btn-blue button" color="info">Replies</Button>
                                    </div>
                                </div>
                    } 
                    )}
                    </ListGroup>
            </div>
        )
    }
}


export default Home;