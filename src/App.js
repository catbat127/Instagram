import './App.css';
import Post from './Post';
import React, { useState, useEffect } from 'react'
import { db } from './firebase'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    //need to pull from db and store it in posts variable
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc => {
        return {
          id: doc.id, 
          post: doc.data()}
      }))
    })
  }, [])

  return (
    <div className="app">

      {/* header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
        />
      </div>

      <h1>HELLO INSTAGRAM</h1>

      {/* posts */}
      {
        posts.map(({id, post}) => {
          return <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        })
      }

    </div>
  );
}

export default App;
