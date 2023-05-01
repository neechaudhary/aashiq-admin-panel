import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { API } from './constant'

//icons
import { AiOutlineUserSwitch } from 'react-icons/ai'
import User_table_list from './User_table_list'
import { AiOutlineClose } from 'react-icons/ai'
import {BsFillCheckCircleFill} from "react-icons/bs"
import {CiMenuKebab} from "react-icons/ci"


const Login_user_list = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState("")

  const [showModal, setShowModal] = useState(false)
  const [userid, setId]= useState("")
  const [image, setImage]= useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [getImage, setGetImage]= useState("")
 
  //upload image
const upload_image = async() =>{
  // console.log(uerid)
  // uerid.preventDefault();
  const formData = new FormData();
  formData.append('image', image)
  axios.put(`${API}/image-upload/${userid}`,formData,{
    headers:{
      "Content-Type": "multipart/formdata"
    }
  })
  .then((res)=>{
    // console.log(res)
    alert(res.data.message)
    window.location.reload()
  })
  .catch((err)=>{
    console.log(err)
  })
}

//update user
const update_user = async() =>{
  const data={
    name:name,
    email:email,
    phone: phone,
    address: address
  }
  axios.put(`${API}/register/${userid}`,data)
  .then((res)=>{
    console.log(res)
    alert(res.data.message)
    window.location.reload()
  })
  .catch((err)=>{
    console.log(err)
  })
}

  const get_login_user = async () => {
    await axios.get(`${API}/login/isLoggedIn`, {
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }
    })
      .then((res) => {
        // console.log(res.data.user)
        setIsLoggedIn(res.data)
        setName(res.data.user.name)
        setEmail(res.data.user.email)
        setPhone(res.data.user.phone)
        setAddress(res.data.user.address)
        setId(res.data.user._id)
        setGetImage(res.data.user.image)

      })
      .catch((err) => {
        console.log(err)
      }
      )
  }
  useEffect(() => {
    get_login_user()
  }, [])
  return (
    <div>
      {isLoggedIn === false ? window.location.href = "/" : (
        <Sidebar>
          <div className='sm:p-[20px] h-screen  overflow-y-scroll mt-[50px] md:mt-0'>
            <div className='w-full py-[8px] px-[5px] shadow-md border flex justify-between mb-[10px]'>
              <div className='flex items-center'>
                <div className='w-[50px] '>
                  <AiOutlineUserSwitch className='w-full' size={30} />
                </div>
                <div className='font-bold text-[20px]'>
                  Profile
                </div>

              </div>
              <div className=''>
                <button onClick={() => setShowModal(!showModal)} className=' p-[8px] z-40  text-white font-semibold'><CiMenuKebab color='#000000'/></button>

              </div>
            </div>

            <User_table_list />
          </div>
          {
            showModal ? (
              <>
                <div className="flex  justify-center z-50 fixed inset-0 left-[50px] right-[50px]  top-[150px] h-[440px] sm:h-[400px]">
                  <div className='bg-[#E2E2E2] w-[500px]  flex flex-col  justify-start shadow-md'>
                    <div className='flex justify-between w-full border-b-[1px] border-[#374151]'>
                      <div></div>
                      <div className='text-[20px] font-bold'>Profile</div>
                      <div className='p-[10px] h-[40px]'><AiOutlineClose size={20} onClick={() => setShowModal(false)} /></div>
                    </div> 
                     <div className='w-full '>
                      <div className='w-full flex items-center justify-center flex-col mt-[20px]'>
                          <div className=' w-[70px] h-[70px] bg-red-400 rounded-full'>
                            <img className='w-full h-full' src={getImage} alt="" />
                         </div>
                      </div>
                     
                      
                         <div className='flex flex-wrap justify-center px-[10px] '> 
                          <div></div>
                          <div>
                          <input className='w-[210px] mt-[10px]' type="file" accept='image/*'  onChange={(e) => setImage(e.target.files[0])} /> 
                          </div>
                          <div className=' w-[100px] flex justify-center items-center mt-[5px] sm:mt-[0px] ml-[10px] bg-green-700 text-white rounded-md px-[5px] py-[3px]' onClick={upload_image}>upload<BsFillCheckCircleFill className='ml-[5px]'/></div>
                          </div>
                      </div>
                    <div className='flex flex-wrap justify-between mt-[20px] px-[10px] sm:p-[10px]'>
                    
                      <div className='w-full sm:w-[45%] mt-[5px]'>
                        <input type="text" placeholder='Name' value={name} className='outline-none w-full p-[4px] border' onChange={(e) => setName(e.target.value)} />
                      </div>

                      <div className='w-full sm:w-[45%] mt-[5px]'>
                        <input type="text" placeholder='Email' value={email} className='outline-none w-full p-[4px] border' onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className='flex flex-wrap justify-between px-[10px] sm:p-[10px]'>
                      <div className='w-full sm:w-[45%] mt-[5px]'>
                        <input type="number" placeholder='Phone' value={phone} className='outline-none w-full p-[4px] border' maxLength={350} onChange={(e) => setPhone(e.target.value)} />
                        {/* <span className='text-[12px] text-red-400'>maximum 350 character are allowed</span> */}
                      </div>

                      <div className='w-full sm:w-[45%] mt-[5px]'>
                        <input type="text" placeholder='Address' value={address} className='outline-none w-full p-[4px] border' onChange={(e) => setAddress(e.target.value)} />
                      </div>

                    </div>
                  

                    <div className='flex justify-center mt-[40px] sm:mt-[10px]'>
                      <div>
                        <button className='bg-[#047F8B] p-[5px] sm:p-[8px] z-40  text-white font-semibold' onClick={()=>update_user()} >Update profile</button>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            ) :
              null
          }


        </Sidebar>
      )}

    </div>
  )
}

export default Login_user_list