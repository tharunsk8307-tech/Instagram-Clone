import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

function Profile() {

    const [profile,SetProfile] = useState(null)
    const [followers, SetFollowers] = useState([])
    const[unfollowed,SetUnfollowed] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
        .then(data =>{SetProfile(data.data); console.log(data)})

        axios.get('http://localhost:3000/followers')
        .then(data =>{SetFollowers(data.data)} )
    },[unfollowed])

    function HandleOnChange(e){
        SetProfile(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleUpdate = async () =>{
        axios.put('http://localhost:3000/profile',profile)
        .then(console.log("Updated"))
        .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) =>{
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(SetUnfollowed(!unfollowed))
        .then(alert("Unfollowed"))
        
    }

  return (
    <div className = "m-5">
      {profile ? (
        <div>
            <img className = "profile rounded-circle" src = {profile.profile_pic} alt = ""/>          
            <h5>
                {profile.username}
            </h5>

            <input type = "text"
                value = {profile.username}
                name = "username"
                className='form-control my-4'
                onChange = {HandleOnChange}
            />

            <input type="text"
                name = "profile_pic"
                value = {profile.profile_pic}
                className='form-control'
                onChange = {HandleOnChange}
            />

            <button className = "btn btn-primary my-4" onClick ={handleUpdate}>Update</button>

        </div>
      ):(
        <div>Loading Profile</div>
      )
      }
      {followers.length >0 ? (
        followers.map(follower =>
            <div key ={follower.id} className = "d-flex my-2">
                {follower.username}
                <button className='btn btn-secondary ms-auto' onClick = {() => {handleUnFollow(follower.id)}}>unFollow</button>
            </div>
        )
      ):(<div>Loading followers</div>)}
    </div>
  )
}

export default Profile
