import React from 'react'
import Review from './Review'
import {Carousel} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

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
                        className="d-block w-100 carouselImg"
                        src="https://s3-media2.fl.yelpcdn.com/bphoto/JOL0dtGJ5kNc5_u_B9FfAA/o.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <NavLink to={'/restaurants/6'} className='linkNotBlue' >
                                <h3>Jacob's Pickles</h3>
                                <p>509 Amsterdam Ave | New York, NY 10024</p>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100 carouselImg"
                        src="https://s3-media3.fl.yelpcdn.com/bphoto/7rgKgSe5XY3Oc-pG4I6q0g/o.jpg"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                            <NavLink to={'/restaurants/16'} className='linkNotBlue' >
                                <h3>Her Name is Han</h3>
                                <p>17 E 31st St | New York, NY 10016</p>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100 carouselImg"
                        src="https://s3-media2.fl.yelpcdn.com/bphoto/qjmbKKwGxgSrwjeycOG6wg/o.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                            <NavLink to={'/restaurants/22'} className='linkNotBlue' >
                                <h3>JSalaThai Restaurant</h3>
                                <p>307 Amsterdam Ave | New York, NY 10023</p>
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
                <h4>Recent Reviews</h4>
                <div>
                    {this.props.user && this.props.user.following.length > 0 && this.state.reviews.length > 0 ? 
                        <>
                            {this.filteredReviews().map(review => <Review key={review.id} review={review} current_user={this.props.user} refreshData={this.fetchReviews}/>)}
                        </>
                    :
                    <>
                        {this.state.reviews.map(review => <Review key={review.id} review={review} current_user={this.props.user} refreshData={this.fetchReviews} />)}
                    </>
                    }
                </div>
            </>
        )
    }
}

export default Home;