import React from 'react'
import {NavLink} from 'react-router-dom'
import {Media, Card, Form, Button} from 'react-bootstrap'
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
        } else if (!this.props.current_user){
            window.alert('You must be logged in to create a comment.')
        } else {
            window.alert('You must write a comment before submitting it.')
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
            this.props.refreshData()
            this.setState({content: ''})
        })
    }

    render(){
        return(
        <>
            <h6>Comments: </h6>
            {this.props.comments.map(comment => <Media>
                <Card style={{ width: '5rem'}}>
                        <Card.Img variant="top" src={comment.user_image} />
                        <Card.Body>
                            <Card.Text className='cardTitleComment'><NavLink to={`/users/${comment.user_id}`}>{comment.user_name} </NavLink></Card.Text>
                        </Card.Body>
                    </Card>
                <Media.Body><p>{comment.content}</p></Media.Body>
                </Media>)}
            <Form onSubmit={this.submitHandler}>
                <Form.Control onChange={(e) => this.setState({content: e.target.value})} value={this.state.content} placeholder='Your comment here' as='textarea' />
                <Button type='submit' >Add Comment</Button>
            </Form>
        </>
        )
    }
}

export default CommentContainer;