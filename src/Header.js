import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import './App.css'
import { auth } from './firebase'
import { Link } from 'react-router-dom'

function Header(props) {
    const [user, setUser] = useState(props.user)
    
    const signOut = () => {
        auth.signOut()
        setUser(null)
    }
    
    return (
        <div>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram Logo"
                />
                {user ? <Button onClick={signOut}>Sign Out</Button> :
                    <div>
                        <Link to="/login">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>}
            </div>
        </div>
    )
}

export default Header
