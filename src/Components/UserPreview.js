import React from 'react';
const token = localStorage.getItem("token")

class UserPreview extends React.Component {
    constructor(props) {
        super(props);
        if (props.inFollowingList) {
            this.state = {
                following: true
            }
        } else if (props.mutualBool) {
            this.state = {
                following: true
            }
        } else {
            this.state = {
                following: false
            }
        }
    }
    

    followFn = (user_id) => {
        fetch(`http://localhost:3000/relationships/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({relationship: {followed_id: user_id}})
        })
        .then(resp => resp.json())
        .then(this.setState({following: !this.state.following}))
    }

    unfollowFn = (id) => {
        fetch(`http://localhost:3000/relationships/${id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(resp => resp.json())
        .then(this.setState({following: !this.state.following}))
    }

    buttonHandler = () => {
        if (this.state.following) {
            this.unfollowFn(this.props.user.relationship_id)
        } else {
            this.followFn(this.props.user.user_id)
        }
    }

    render(){
        console.log(this.props)
        return (
        <div>
            {this.props.user.name}
            <button onClick={this.buttonHandler}>{this.state.following ? "UnFollow" : "Follow"}</button> 
        </div>
        )
    }
}

export default UserPreview;