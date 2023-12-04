import './App.css';
import Post from './Post';
import React, { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core';
import ImgUpload from './ImgUpload';
import Header from './Header';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    //need to pull from db and store it in posts variable
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          post: doc.data()
        }
      }))
    })
  }, [])

  //listen for changes in user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser)
      } else {
        //user is not logged in
        setUser(null)
      }
    })
    return () => {
      //perform some clean up before actions b4 refiring useEffect
      unsubscribe()
    }
  }, [user, username])

  const signUp = (event) => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message))

    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))

    setOpenSignIn(false)
  }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => { setOpen(false) }}
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <center>
              <form className="app__signup">
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram Logo"
                />

                <Input
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signUp} type="submit">Sign Up</Button>
              </form>
            </center>
          </div>
        }
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => { setOpenSignIn(false) }}
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <center>
              <form className="app__signup">
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram Logo"
                />

                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signIn} type="submit">Sign In</Button>
              </form>
            </center>
          </div>
        }
      </Modal>

      {/* header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
        />
        {user ? <Button onClick={() => auth.signOut()}>Sign Out</Button> :
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>}
      </div>

      {/* <h3>Header again</h3>
      {<Header user={user}/>} */}

      {user?.displayName ? <ImgUpload username={user.displayName} /> : <h3>Log In To Upload</h3>}

      {/* posts */}
      <div className="app__posts">
        {
          posts.map(({ id, post }) => {
            return <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          })
        }
      </div>

    </div>
  );
}

export default App;
