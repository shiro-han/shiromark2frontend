import React from 'react'
import Review from './Review'
import {Carousel} from 'react-bootstrap'

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
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://s3-media2.fl.yelpcdn.com/bphoto/JOL0dtGJ5kNc5_u_B9FfAA/o.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
                <h4>Recent Reviews</h4>
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