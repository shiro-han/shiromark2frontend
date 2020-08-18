import React from 'react'
import {Media} from 'react-bootstrap'
const token = localStorage.getItem("token")

class CommentContainer extends React.Component {
    state = {
        content: ''
    }

    submitHandler = (e) => {
        e.preventDefault();
        if (this.props.current_user && this.state.content) {
            let newComment = {
                content: this.state.content,
                user_id: this.props.current_user.id,
                review_id: this.props.review_id
            }
            this.postComment(newComment)
        } else {
            window.alert('You must be logged in to create a comment or you must write a comment to submit')
        }
    }

    postComment = (newComment) => {
        fetch(`http://localhost:3000/comments/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({ comment: newComment})
        }).then(resp => resp.json())
        .then(data => {
            this.props.fetchRestaurant()
            this.setState({content: ''})
        })
    }

    render(){
        return(
        <>
            <h6>Comments: </h6>
            {this.props.comments.map(comment => <Media>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={comment.user_image}
                    alt="Generic placeholder"
                />
                {comment.user_name}
                <Media.Body><p>{comment.content}</p></Media.Body>
                </Media>)}
            <form onSubmit={this.submitHandler}>
                <input onChange={(e) => this.setState({content: e.target.value})} value={this.state.content} placeholder='Your comment here' type='textarea' />
                <input value='Add Comment' type='submit' />
            </form>
        </>
        )
    }
}

export default CommentContainer;