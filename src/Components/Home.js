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
        .then(data => this.setState({reviews: data}))
    }

    filteredReviews = () => this.state.reviews.filter(review => this.props.user.following.map(user => user.user_id).includes(review.user_id))


    render(){
        return(
            <>
                <h2>ShiroMark 2 Home Page</h2>
                <div>Featured Restaurants</div>
                <div>Feed</div>
                <div>
                    {this.props.user && this.props.user.following.length > 0 && this.state.reviews.length > 0 ? 
                        <>
                            {this.filteredReviews().map(review => <Review key={review.id} review={review} user={this.props.user}/>)}
                        </>
                    :
                    <>
                        {this.state.reviews.map(review => <Review key={review.id} review={review} user={this.props.user}/>)}
                    </>
                    }
                </div>
            </>
        )
    }
}

export default Home;