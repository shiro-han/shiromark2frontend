import React from 'react';
import UserPreview from './UserPreview'

class FollowingList extends React.Component{

    render(){
        
        return(
        <>
            <h1>FollowingList</h1>
            
            {this.props.user.following.map(user => <UserPreview user={user} />)}
        </>)

    }
}

export default FollowingList;