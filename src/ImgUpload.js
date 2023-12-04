import { useState } from 'react'
import { Button } from '@material-ui/core'
import { db, storage } from './firebase'
import firebase from 'firebase'
import './ImgUpload.css'

function ImgUpload({username}) {
    {/* 1. caption input
      2. file picker
      3. post button */}
      
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    //handleChange is a function that fires off event e
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                // error function
                console.log(error)
                alert(error.message)
            },
            () => {
                // complete function
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image inside db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })

                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }

    return (
        <div className="imgUpload">
            <input
                type="text"
                value={caption}
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
            />
            <progress value={progress} max="100" className="imgUpload__progress" />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImgUpload
