import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { API } from "./constant"
import axios from "axios"

//icons
import { GrServices } from "react-icons/gr"
import { AiOutlineClose } from 'react-icons/ai'
import { BsWhatsapp } from "react-icons/bs"

//images
import loading_img from "./../assets/loading.gif"



const Services = () => {
  const [showModal, setShowModal] = useState(false)
  const [Edit_modal, setEdit_modal] = useState(false)
  const [serv_name, setServicename] = useState("")
  const [ur_name, setYourname] = useState("")
  const [description, setDescription] = useState("")
  const [Phone, setPhone] = useState("")
  const [Image_Link, setImage_Link] = useState("")
  const [id_to_edit, setId_to_edit] = useState("")

  const [service, setService] = useState('')
  const [loading, setLoading] = React.useState(false)


  const [user, setUser] = useState("")

  const [isLoggedIn, setIsLoggedIn] = React.useState("")


  const get_login_user = async () => {
    await axios.get(`${API}/login/isLoggedIn`,{
     headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
      }
    })
    .then((res) => {
        // console.log(res)
        setIsLoggedIn(res.data)
       
    })
    .catch((err) => {
        console.log(err)
    }
    )
}
useEffect(() => {
    get_login_user()
}, [])


    //scroll to top
    useEffect(() => {
      window.scrollTo(
        {
          top: 0,
          behavior: "smooth"
      })
    }, [])

  const get_data = () => {
    axios.get(`${API}/service`)
      .then(res => {
        console.log(res.data.services)
        setUser(res.data.services)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    get_data()
  }, [])

  const submitService = async (e) => {
    e.preventDefault()
    const data = {
      serv_name: serv_name,
      ur_name: ur_name,
      description: description,
      serv_number: Phone,
      image: Image_Link
    }
    axios.post(`${API}/service`, data)
      .then(res => {
        // console.log(res)
        alert(res.data.message)
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }


  const getService = async () => {
    setLoading(true)
    axios.get(`${API}/service`)
      .then(res => {
        // console.log(res.data.services)
        setService(res.data.services)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getService()
  }, [])

  const get_id_to_update = async (id) => {
    
    axios.get(`${API}/service/${id}`)
      .then(res => {
        setId_to_edit(id)
        setEdit_modal(!Edit_modal)
        // console.log(res.data.service)
        setServicename(res.data.service.serv_name)
        setYourname(res.data.service.ur_name)
        setDescription(res.data.service.description)
        setPhone(res.data.service.serv_number)
        setImage_Link(res.data.service.image)
      })
      .catch(err => {
        console.log(err)
      })
  }



  const updateService = async (id) => {
    const data = {
      serv_name: serv_name,
      ur_name: ur_name,
      description: description,
      serv_number: Phone,
      image: Image_Link
    }
    axios.put(`${API}/service/${id}`, data)
      .then(res => {
        // console.log(res)
        alert(res.data.message)
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteService = async (id) => {
    axios.delete(`${API}/service/${id}`)
      .then(res => {
        // console.log(res)
        alert(res.data.message)
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
    {isLoggedIn === false ? (<><h1>Not Logged In</h1></>) : (
      <Sidebar>
      <div className='p-[20px] h-screen  overflow-y-scroll mt-[50px] md:mt-0'>

        <div className='w-full py-[8px] px-[5px] shadow-md border flex justify-between mb-[10px]'>
          <div className='flex items-center'>
            <div className='w-[50px] '>
              <GrServices className='w-full' size={30} />
            </div>
            <div className='font-bold text-[20px]'>
              Services
            </div>

          </div> 
          <div>
            <button onClick={() => setShowModal(!showModal)} className='bg-[#047F8B] p-[8px] z-40  text-white font-semibold'>Add services</button>
          </div>
        </div>

        <div className="flex justify-around flex-wrap gap-6 mb-6  items-stretch ">
        <div className='p-[20px] '>
        {loading ? <><div className='flex justify-center  w-full h-screen '>
            <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
          </div>
          </> : null}
          <div className="grid grid-cols-1 gap-6 mb-6  sm:grid-cols-2 lg:grid-cols-3">
            {
              user && user.map((item) => {
                return (
                  
                    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2">
                      <img className="w-full h-[200px]" src={item.image} alt="Random image" />
                      <div className="px-6 pt-2">
                        <div className="font-bold text-xl mb-2 text-left">{item.serv_name}</div>
                      </div>
                      <div className=" pt-2 pb-2">
                      <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer" onClick={()=>get_id_to_update(item._id)}>Edit</span>
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer" onClick={()=>deleteService(item._id)}>Delete</span>
              {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#tag3</span> */}
            </div>
                      </div>
                    </div>

                );
              })
            }
            </div>
            </div>
        </div>
        
        {/* <div className="flex justify-around flex-wrap gap-6 mb-6  items-stretch ">
          <div className="max-w-sm 2xl:max-w-md 3xl:max-w-lg rounded overflow-hidden shadow-lg border flex flex-col justify-between">

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Card Title</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Nulla sit amet nisi id magna euismod hendrerit vitae ut libero
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Edit</span>
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Delete</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#tag3</span>
            </div>
          </div>

          <div className="max-w-sm 2xl:max-w-md 3xl:max-w-lg rounded overflow-hidden shadow-lg border flex flex-col justify-between">

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Card Title</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Nulla sit amet nisi id magna euismod hendrerit vitae ut libero
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Edit</span>
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Delete</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#tag3</span>
            </div>
          </div>

          <div className="max-w-sm 2xl:max-w-md 3xl:max-w-lg rounded overflow-hidden shadow-lg border flex flex-col justify-between">

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Card Title</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis massa vel dignissim bibendum. Nulla sit amet nisi id magna euismod hendrerit vitae ut libero.
                Nulla sit amet nisi id magna euismod hendrerit vitae ut libero
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Edit</span>
              <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Delete</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#tag3</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* show modal */}
      {
        showModal ? (
          <>
            <div className="flex  justify-center z-50 fixed inset-0 left-[50px] right-[50px]  top-[150px] h-[350px] sm:h-[300px]  ">
              <div className='bg-[#E2E2E2] w-[500px]  flex flex-col  justify-start shadow-md'>
                <div className='flex justify-between w-full border-b-[1px] border-[#374151]'>
                  <div></div>
                  <div className='text-[20px] font-bold'>Create service</div>
                  <div className='p-[10px] h-[40px]'><AiOutlineClose size={20} onClick={() => setShowModal(false)} /></div>
                </div>
                <div className='flex flex-wrap justify-between mt-[20px] px-[10px] sm:p-[10px]'>
                  <div className='w-full sm:w-[45%] mt-[5px]'>
                    <input type="text" placeholder='Enter service name' className='outline-none w-full p-[4px] border' onChange={(e) => setServicename(e.target.value)} />
                  </div>

                  <div className='w-full sm:w-[45%] mt-[5px]'>
                    <input type="text" placeholder='Enter your name' className='outline-none w-full p-[4px] border' onChange={(e) => setYourname(e.target.value)} />
                  </div>
                </div>
                <div className='flex flex-wrap justify-between px-[10px] sm:p-[10px]'>
                  <div className='w-full sm:w-[45%] mt-[5px]'>
                  <input type="text" placeholder='Image link' className='outline-none w-full p-[4px] border' maxLength={350} onChange={(e) => setImage_Link(e.target.value)} />
                    {/* <span className='text-[12px] text-red-400'>maximum 350 character are allowed</span> */}
                  </div>

                  <div className='w-full sm:w-[45%] mt-[5px]'>
                    <input type="text" placeholder='Service number' className='outline-none w-full p-[4px] border' onChange={(e) => setPhone(e.target.value)} />
                  </div>

                </div>
                <div className='flex justify-between mt-[5px] sm:mt-[0px] px-[10px]'>
                  <div className='w-[100%]'>
                  <textarea rows={2} cols={50} type="text" placeholder='Description' className='outline-none resize-none w-full p-[4px] border'  onChange={(e) => setDescription(e.target.value)} />

                  </div>
                </div>

                <div className='flex justify-center mt-[15px]'>
                  <div>
                    <button className='bg-[#047F8B] p-[8px] z-40  text-white font-semibold' onClick={submitService}>Add services</button>
                  </div>
                </div>

              </div>
            </div>
          </>
        ) :
          null
      }


        {/* edit modal */}
        {
        Edit_modal ? (
          <>
            <div className="flex  justify-center z-50 fixed inset-0 left-[50px] right-[50px]  top-[150px] h-[350px] sm:h-[300px]  ">
              <div className='bg-[#E2E2E2] w-[500px]  flex flex-col  justify-start shadow-md'>
                <div className='flex justify-between w-full border-b-[1px] border-[#374151]'>
                  <div></div>
                  <div className='text-[20px] font-bold'>Edit service</div>
                  <div className='p-[10px] h-[40px]'><AiOutlineClose size={20} onClick={() => setEdit_modal(false)} /></div>
                </div>
                <div className='flex flex-wrap justify-between mt-[20px] px-[10px] sm:p-[10px]'>
                  <div className=' w-full sm:w-[45%] mt-[5px]'>
                    <input type="text"value={serv_name} placeholder='Enter service name' className='outline-none w-full p-[4px] border' onChange={(e) => setServicename(e.target.value)} />
                  </div>

                  <div className='w-full sm:w-[45%] mt-[5px]'>
                    <input type="text" value={ur_name} placeholder='Enter your name' className='outline-none w-full p-[4px] border' onChange={(e) => setYourname(e.target.value)} />
                  </div>
                </div>
                <div className='flex flex-wrap justify-between px-[10px] sm:p-[10px]'>
                  <div className='w-full sm:w-[45%] mt-[5px]'>
                  <input type="text" value={Image_Link} placeholder='Image link' className='outline-none w-full p-[4px] border' maxLength={350} onChange={(e) => setImage_Link(e.target.value)} />

                    {/* <span className='text-[12px] text-red-400'>maximum 350 character are allowed</span> */}
                  </div>

                  <div className='w-full sm:w-[45%] mt-[5px]'>
                    <input type="text" value={Phone} placeholder='Service number' className='outline-none w-full p-[4px] border' onChange={(e) => setPhone(e.target.value)} />
                  </div>

                </div>
                <div className='flex justify-between  px-[10px] mt-[5px]'>
                  <div className='w-[100%]'>
                  <textarea rows={2} cols={50}  type="text" value={description} placeholder='Description' className='outline-none resize-none w-full p-[4px] border'  onChange={(e) => setDescription(e.target.value)} />

                  </div>
                </div>

                <div className='flex justify-center mt-[15px]'>
                  <div>
                    <button className='bg-[#047F8B] p-[8px] z-40  text-white font-semibold ' onClick={()=>updateService(id_to_edit)}>Edit services</button>
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
    
    </>
  )
}

export default Services