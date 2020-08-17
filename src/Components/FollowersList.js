import React from 'react';
import UserPreview from './UserPreview'

const token = localStorage.getItem("token")

class FollowersList extends React.Component{

    render(){
        let following_ids = this.props.user.following.map(user => user.user_id)
        let mutuals = this.props.user.followers.filter(follower => following_ids.includes(follower.user_id))
        let mutual_ids = mutuals.map(mutual => mutual.user_id)
        console.log('Mutuals: ', mutuals)
        
        return(
        <>
            <h1>Followers List</h1>
            {this.props.user.followers.map(follower_user => <UserPreview user={follower_user} inFollowingList={false} mutualBool={mutual_ids.includes(follower_user.user_id)} /> )}
        </>)

    }
}

export default FollowersList;