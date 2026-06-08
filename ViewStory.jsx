import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import Stories from './Stories'

function ViewStory() {
    const {id,tot} = useParams()

    const [story, setStory] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/story/${id}`)
        .then(data => data.json())
        .then(data => setStory(data))
        .catch((err) =>console.log(err))
    },[id]);

    if (id > tot || id<=0){
        navigate('/');
    }
  return (
    <div key = {story.id}>
      {story? <div className ='d-flex justify-content-center align-items-center'>
        <Link to ={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
        <img className='vh-100 ' src = {story.image} alt = "story"/>
        <Link to = {`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
    </div> : 
    <div>Loading</div>}
    </div>
  )
}

export default ViewStory
