import React from 'react';
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import Cookies from 'js-cookie'

class Replies extends React.Component {
    constructor(props) {
        super();
        this.state = {
            content: []
        }
    }

   
    componentDidMount() {
        Cookies.set('page', 'Replies')
        const cookie = Cookies.get('authorization')
        const messageid = Cookies.get('messageid')
        fetch('http://localhost:3000/reply', {
            method: 'get',
            headers: {'authorization': cookie, 'messageid': messageid},
        })
        .then(response => response.json())
        .then(doc => {
            console.log(doc)
            this.setState({content: doc})
        })
    }

    onBackClick = () => {
        Cookies.remove('messageid')
        this.props.onRouteChange('Home');
    }

    render() {
        const {onRouteChange} = this.props
        return (
            <div>
                <h1 style={{paddingBottom: '25px'}} className="form">
                    <span className="font-weight-bold">Guestbook</span>.com
                </h1>
                <div style={{textAlign:'center', paddingBottom:'10px'}}>
                    <h2>Replies</h2>
                    <Button onClick={() => onRouteChange('WriteReplies')} color="primary">Write New Reply</Button>
                </div>
                    <ListGroup className="list-group messageContainer">
                    {this.state.content.map((item, i) => {  
                        return <div className="center" key={i}>
                                    <div className="messageContainer"> 
                                        <ListGroupItem  className="list-group-item messageContainer" >
                                            {item.content}
                                        </ListGroupItem>
                                    </div>
                                </div>
                    } 
                    )}
                    <div className="center" style={{width:'40%'}} >
                    <Button style={{margin:'auto'}} onClick={this.onBackClick} className="btn-sm"color="warning" block>Back</Button>
                    </div>
                    </ListGroup>
            </div>
        )
    }
}

export default Replies
