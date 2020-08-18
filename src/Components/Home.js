import React from 'react'
import Review from './Review'

const token = localStorage.getItem("token") //grabs token that is stored after login 


class Home extends React.Component {
   
    state = {
        reviews: []
    }

    componentDidMount(){
        this.fetchReviews()
    }

    fetchReviews = () => {
        fetch(`http://localhost:3000/reviews`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({reviews: data})
            this.filterReviews()
        })
    }

    filterReviews = () => {
        if (this.props.user) {
            let following_ids = this.props.user.following.map(user => user.user_id)
            let mutuals = this.state.reviews.filter(review => following_ids.includes(review.user_id))
            let test = this.state.reviews.filter(review => this.props.user.following.map(user => user.user_id).includes(review.user_id))
            console.log(test)
            // renderMutuals(mutuals);
            // following_ids.map(id => this.followingReviews(id))
            // let followingReviews = following_ids.map(id => this.state.reviews.filter(review => review.user_id === id))
            // let newArray = followingReviews.map(review => review)
        }
    }

    renderMutuals = (reviews) => {
        // reviews.map(review => <Review key={review.id} review={review} user={this.props.user}/>)
    }

    followingReviews = (id) => {
        let followingReviews = this.state.reviews.filter(review => review.user_id === id)
        console.log(followingReviews)
    }



    // identifyIds = () => {
    //     if (this.props.user) {
    //         let following_ids = this.props.user.following.map(user => user.user_id)
    //         following_ids.map(id => this.fetchFollowingUsers(id))
    //     }
    // }

    // fetchFollowingUsers (id) { //for each id of a user im following
    //     fetch(`http://localhost:3000/users/${id}`, { //fetch that user 
    //         method: "GET", 
    //         headers: { Authorization: `Bearer ${token}` },
    //     })
    //         .then(resp=>resp.json())
    //         .then(data => {
    //             // console.log(data.user.reviews.map(review => review))
    //             let newReview = data.user.reviews.map(review => review) //grab each review they've written 
    //             console.log(newReview)
    //             // let newArray = [...this.state.reviews] //create a new array that copies what's currently in the reviews 
    //             // newArray.push(newReview)
    //             // this.setState({reviews: newArray})
    //         })
    // }

    

    render(){
        return(
            <>
            <h2>ShiroMark 2 Home Page</h2>
            <div>Featured Restaurants</div>
            <div>Feed</div>
                <>
                    {this.props.user && this.state.reviews.length > 0 ? 
                        <div>
                            {this.state.reviews.filter(review => this.props.user.following.map(user => user.user_id).includes(review.user_id)).map(review => <Review key={review.id} review={review} user={this.props.user}/>)}
                        </div>
                    :
                    <div>
                        {this.state.reviews.map(review => <Review key={review.id} review={review} user={this.props.user}/>)}
                    </div>
                    }
                </>
                
            </>

        )
    }
}

export default Home;