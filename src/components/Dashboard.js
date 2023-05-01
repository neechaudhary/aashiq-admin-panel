import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { API } from './constant'

//images
import loading_img from "./../assets/loading.gif"

//icons
import { MdAdminPanelSettings } from "react-icons/md"
import { GrPersonalComputer } from "react-icons/gr"
import { AiOutlineDashboard } from "react-icons/ai"


const Dashboard = () => {
  const [loading, setLoading] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState("")
  const [total_admin, setTotalAdmin] = React.useState("")
  const [online_admin, setOnlineAdmin] = React.useState("")
  

  const total_user = async () => {
    await axios.get(`${API}/register/total-user`)
      .then((res) => {
        // console.log(res.data.data)
        setTotalAdmin(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    total_user()
  }, [])

  const online_user = async () => {
    await axios.get(`${API}/register/online-user`)
      .then((res) => {
        // console.log(res.data.data)
        setOnlineAdmin(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    online_user()
  }, [])


  const get_login_user = async () => {
    await axios.get(`${API}/login/isLoggedIn`, {
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
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (

    <>
      {isLoggedIn === false ? (<><h1>Not Logged In</h1></>) : (<Sidebar>

        <div className='p-[20px] h-screen overflow-y-scroll mt-[50px] md:mt-[0px]'>
          <div className='w-full py-[8px] px-[5px] shadow-md border flex justify-between mb-[10px]'>
            <div className='flex items-center'>
              <div className='w-[50px] '>
                <AiOutlineDashboard className='w-full' size={30} />
              </div>
              <div className='font-bold text-[20px]'>
                Dashboard
              </div>

            </div>
            <div className='invisible'>
              {/* <button  className='bg-[#047F8B] p-[8px] z-40  text-white font-semibold'>Add services</button> */}
            </div>
          </div>
          {loading ? <><div className='flex justify-center  w-full h-screen '>
            <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
          </div>
          </> : null
          }

          {/* {loading ? <><img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" /></> : null} */}
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex justify-between p-[10px]">
              <div>
                <div className='font-bold text-[20px]'>Total Admin</div>
                <div className='text-[18px] font-semibold'>
                {loading ? <><div className='flex justify-center  w-full h-screen '>
            <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
          </div>
          </> : (total_admin)
          }
                </div>
              </div>
              <div className='w-[50px]'>
                <MdAdminPanelSettings size={50} />
              </div>
            </div>

            <div className="max-w-sm rounded overflow-hidden shadow-lg flex justify-between p-[10px]">
              <div>
                <div className='font-bold text-[20px]'>Active Admin</div>
                <div className='text-[18px] font-semibold'>  {loading ? <><div className='flex justify-center  w-full h-screen '>
            <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
          </div>
          </> : (online_admin)
          }</div>
              </div>
              <div>
                <GrPersonalComputer size={50} />
              </div>
            </div>

            <div className="max-w-sm rounded overflow-hidden shadow-lg flex justify-between p-[10px] invisible">
              <div>
                <div className='font-bold text-[20px]'>Total Admin</div>
                <div className='text-[18px] font-semibold'>4</div>
              </div>
              <div>

              </div>
            </div>
          </div>


        </div>
      </Sidebar>)}

    </>
  )
}

export default Dashboard