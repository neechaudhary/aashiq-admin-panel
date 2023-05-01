import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './constant';

//image
import loading_img from "./../assets/loading.gif"


export default function Multiple_user() {
    const [userid, setuserid] = useState('')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [status, setStatus] = useState('')
    const [userdata,setuserdata]= useState([])
    const [loading, setloading] = useState(false)

    const get_login_user = async () => {
        await axios.get(`${API}/login/isLoggedIn`,{
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            // console.log(res.data.user)
            setuserid(res.data.user._id)
            setname(res.data.user.name)
            setemail(res.data.user.email)
        })
        .catch((err) => {
            console.log(err)
            // alert(err.data)
        }
        )
    }
    useEffect(() => {
        get_login_user()
    }, [])

    const varios_user_status= async() =>{
        setloading(true)
        axios.put(`${API}/check-status`,{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            }
        })
        .then((res)=>{
            // console.log(res.data.data.status)
            setStatus(res.data.data.status)
            setloading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        varios_user_status()
    },[])

    const get_userdata= async() =>{
        axios.get(`${API}/register`,{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            }
          })
          .then((res)=>{
              // console.log(res.data.data)
              setuserdata(res.data.data)
          })
          .catch((err)=>{
              console.log(err)
          })
    }
    useEffect(()=>{
        get_userdata()
    },[])




  return (
   <div className='table-responsive'>
        {loading ? <><div className='flex justify-center  w-full h-screen '>
        <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
      </div>
      </> : null
}

<table class="table">
  <thead class="black white-text">
    <tr>
    <th scope="col">#</th>
      <th scope="col">Userid</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Status</th>

     
    </tr>
  </thead> 
  <tbody >



    {
      // console.log(userdata)
    userdata && userdata.map((user,index)=>{

        return(
            
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
          </tr>
        )
    })
    }
    
  </tbody>
</table>
   </div>
  );
}