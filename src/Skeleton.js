import React from 'react'
import './Skeleton.css'
import { Outlet ,Link} from "react-router-dom";
const Skeleton = () => {
  return (
    <div className='main'>
   <div className='sidebar'>
    <div className='user_profile'>
    <img style={{height:"80px"}} src="https://img.icons8.com/officel/80/user.png" alt="user"/>
    <p style={{fontSize:"20px",fontWeight:"700"}}>Guest User</p>
    </div>
 
        <div><Link to='/'>Home Page </Link></div>
        <div><Link to='/about'>About Page </Link></div>
        <div>Dummy Page</div>
        <div>Dummy Page </div>
        <div>Dummy Page </div>

    <div >Logout</div>
   </div>
  <div className='content'>
    <div className='header'>
   
    </div>
    <div className='content_below'>
        <Outlet/>
    </div>
  </div>
  </div>
  )
}

export default Skeleton