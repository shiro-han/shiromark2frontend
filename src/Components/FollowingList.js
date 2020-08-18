import React from 'react';
import UserPreview from './UserPreview'
import {Modal, Button} from 'react-bootstrap'

class FollowingList extends React.Component{

    render(){
        
        return(
        <Modal show={this.props.show}>
            <Modal.Header>
                <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.user.following.map(user => <UserPreview user={user} inFollowingList={true}/>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModals}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>)

    }
}

export default FollowingList;