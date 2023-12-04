import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import firebase from 'firebase'

function Post(props) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        let unsubscribe
        if (props.postId) {
            unsubscribe = db.collection('posts')
                .doc(props.postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }

        return () => [
            unsubscribe()
        ]
    }, [props.postId])

    const postComment = (event) => {
        event.preventDefault()

        console.log('Comments: ', comments)

        db.collection('posts')
            .doc(props.postId)
            .collection('comments')
            .add({
                text: newComment,
                username: props.user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        setNewComment('')
    }

    return (
        <div className="post">

            {/* header -> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='Catherine'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{props.username}</h3>
            </div>

            {/* image */}
            <img className="post__image" alt="post" src={props.imageUrl} />

            {/* username + caption */}
            <h4 className="post__text"><strong>{props.username} </strong>{props.caption}</h4>


            <div className="post__comments">
                {
                    comments.map((comment) => {
                        return <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    })

                }
            </div>

            {props.user?.displayName &&
                <form className="post__commentBox">
                    <input
                        className="post__comment"
                        type="text"
                        placeholder="Add a comment.."
                        value={newComment}
                        onChange={(e) => { setNewComment(e.target.value) }}
                    />
                    <button
                        className="post__button"
                        type="submit"
                        disabled={!newComment}
                        onClick={postComment}
                    >Post
                    </button>
                </form>}
        </div>
    )
}

export default Post
