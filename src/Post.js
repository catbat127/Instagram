import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post(props) {
    return (
        <div className="post">

            {/* header -> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='Catherine'
                    src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/130062185/original/243a32fa7260bfb8718af4341a9449e271ee3867/draw-a-cute-cartoon-portrait-for-a-profile-picture.jpg"
                />
                <h3>{props.username}</h3>
            </div>

            {/* image */}
            <img className="post__image" alt="post" src={props.imageUrl} />

            {/* username + caption */}
            <h4 className="post__text"><strong>Username: </strong>{props.caption}</h4>
        </div>
    )
}

export default Post
