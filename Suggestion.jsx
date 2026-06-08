import { useState,useEffect} from 'react'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function Suggestion() {

    const [profile,setProfile] = useState(null)
    const [suggestions,setSuggestion] = useState([])

    useEffect(() =>{
        fetch('http://localhost:3000/profile')
        .then(data =>data.json())
        .then(data => setProfile(data))
        .catch(err => console.log(err))

        fetch('http://localhost:3000/suggestion')
        .then(data =>data.json())
        .then(data => setSuggestion(data))
        .catch(err => console.log(err))
    },[])

    const handleFollow = async(id,username)  => {
      axios.post('http://localhost:3000/followers',{"id":id,"username":username})
      .then(alert('followed'))
    }
  return (
    <div>
      <div className = "suggestions w-75 m-3">
        {profile?
        <div className='d-flex'>
            <img className='dp rounded-circle' src = {profile.profile_pic} alt = ""/>
            <h5>{profile.username}</h5>
            <Link to = {"http://localhost:5173/profile"}><small className='ms-auto text-primary'>Switch</small></Link>
        </div>
          : <p>Loading</p>}

          <div className = 'd-flex'>
            <p>Suggested for you</p>
            <b className = 'ms-auto'>See All</b>

          </div>
          {suggestions.length >0 ? (
          <div>
            {suggestions.map((suggestion) => (
              <div  key = {suggestion.id}>
                <div className='d-flex'>
                  <img className='dp rounded-circle' src = {suggestion.profile_pic} alt = ""/>
                  <h5>{suggestion.username}</h5>
                  <a className = "text-primary ms-auto" onClick = {() => {handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                </div>
              </div>
            ))}
          </div>
    ):(
        <div>Loading</div>
      )}
      </div>
      
    </div>
  )
}

export default Suggestion
