import React from 'react';
import UserPreview from './UserPreview'
import {Modal, Button} from 'react-bootstrap'

const token = localStorage.getItem("token")

class FollowersList extends React.Component{

    render(){
        let following_ids = this.props.user.following.map(user => user.user_id)
        let mutuals = this.props.user.followers.filter(follower => following_ids.includes(follower.user_id))
        let mutual_ids = mutuals.map(mutual => mutual.user_id)
        
        return(
        <Modal show={this.props.show}>
            <Modal.Header>
                <Modal.Title>Followers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.user.followers.map(follower_user => <UserPreview user={follower_user} inFollowingList={false} mutualBool={mutual_ids.includes(follower_user.user_id)} /> )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModals}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>)

    }
}

export default FollowersList;