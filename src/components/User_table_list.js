import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './constant';

//img
import loading_img from "./../assets/loading.gif"

export default function User_table_list() {
    const [userid, setuserid] = useState('')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [loading, setloading] = useState(false)

    const get_login_user = async () => {
      setloading(true)
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
            setloading(false)
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
     
    </tr>
  </thead>
  <tbody>
    <tr >
      <td><div  className=' w-[40px]  h-[40px] bg-red-500 rounded-full'></div></td>
      <th scope="row" >{userid}</th>
      <td >{name}</td>
      <td>{email}</td>
      
     
    </tr>
  
    {/* <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      
    </tr> */}
  </tbody>
</table>
   </div>
  );
}