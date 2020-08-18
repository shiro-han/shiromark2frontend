import React from 'react'
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
        .then(data => {this.setState({reviews: data})})
    }



    identifyIds = () => {
        if (this.props.user) {
            let following_ids = this.props.user.following.map(user => user.user_id)
            following_ids.map(id => this.fetchFollowingUsers(id))
        }
    }

  

    fetchFollowingUsers (id) { //for each id of a user im following
        fetch(`http://localhost:3000/users/${id}`, { //fetch that user 
            method: "GET", 
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(resp=>resp.json())
            .then(data => {
                // console.log(data.user.reviews.map(review => review))
                let newReview = data.user.reviews.map(review => review) //grab each review they've written 
                console.log(newReview)
                // let newArray = [...this.state.reviews] //create a new array that copies what's currently in the reviews 
                // newArray.push(newReview)
                // this.setState({reviews: newArray})
            })
    }

    

    render(){
        // this.identifyIds();
        return(
            <>
            <h2>ShiroMark 2 Home Page</h2>
            <div>Featured Restaurants</div>
            <div>Feed</div>
                <>
                    {this.props.user ? 
                        <div>
                            hi
                        </div>
                    :
                    <div>
                        hi
                    </div>
                    }
                </>
                
            </>

        )
    }
}

export default Home;