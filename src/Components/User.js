import React from 'react'
import Review from './Review'

class User extends React.Component{

    state = {user: null}

    fetchUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(data => this.setState({user: data.user}))
    }

    componentDidMount(){
        this.fetchUser(this.props.match.params.userId)
    }
    

    render() {
        return (
            <>
                {this.state.user ?
                    <div>
                        <h1>{this.state.user.name}</h1>
                        <img src={this.state.user.image} alt='chicken' />
                        <p>{this.state.user.bio}</p>
                        <h3>Has {this.state.user.reviews.length} reviews</h3>
                        {this.state.user.reviews.map(review => <Review key={review.id} review={review} />)}
                    </div>
                    :
                    <h1>LOADING...</h1>
                }
            </>
        )
    }
}

export default User;