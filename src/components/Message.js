import React from 'react'
import Sidebar from './Sidebar'

//img   
import loading_img from "./../assets/loading.gif"


//icons
import { BsChatDots } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

import axios from 'axios'
import { API } from './constant'

const Message = () => {
    const [contact_data, setContact_data] = React.useState([])
    const [showModal, setShowModal] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        axios.get(`${API}/contact`)
            .then((res) => {
                // console.log(res.data)
                setContact_data(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const delete_message = async (id) => {
        axios.delete(`${API}/contact/${id}`)
            .then((res) => {
                // console.log(res)
                alert(res.data.message)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const get_message_id = async (id) => {
        axios.get(`${API}/contact/${id}`)
            .then((res) => {
                setShowModal(true)
                console.log(res.data)
                setMessage(res.data.message)
                // alert(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // const data = Array.isArray(contact_data)
    // console.log(data)

    return (
        <div>
            <Sidebar>
                <div className='p-[20px] h-screen  overflow-y-scroll mt-[50px] md:mt-0'>

                    <div className='w-full py-[8px] px-[5px] shadow-md border flex justify-between mb-[10px]'>
                        <div className='flex items-center'>
                            <div className='w-[50px] '>
                                <BsChatDots className='w-full' size={30} />
                            </div>
                            <div className='font-bold text-[20px]'>
                                Messages
                            </div>

                        </div>
                        <div className='invisible'>
                            hidden div
                        </div>
                    </div>

                    {loading ? <><div className='flex justify-center  w-full h-screen '>
                        <img className='w-[100px] h-[100px] mix-blend-color-lighten' src={loading_img} alt="loading" />
                    </div>
                    </> : null
                    }


                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
                        {contact_data && contact_data.map((item, index) => {
                            return (
                                <div className="max-w-sm rounded overflow-hidden shadow-lg p-[10px]" key={index}>
                                    <div>
                                        <div className='font-bold text-[20px]'>{item.name}</div>
                                        <div className='text-[18px] font-semibold'>{item.email}</div>
                                    </div>
                                    <div className='w-full h-[30px] text-ellipsis overflow-hidden whitespace-nowrap'>
                                        {item.message}
                                    </div>
                                    <div className=" pt-4 pb-2">
                                        <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer" onClick={() => get_message_id(item._id)}>Read more</span>
                                        <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer" onClick={() => delete_message(item._id)}>Delete</span>
                                        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#tag3</span> */}
                                    </div>
                                </div>)

                        })}

                        {/* <div className="max-w-sm rounded overflow-hidden shadow-lg flex justify-between p-[10px]">
                            <div>
                                <div className='font-bold text-[20px]'>Active Admin</div>
                                <div className='text-[18px] font-semibold'>j</div>
                            </div>
                            <div>

                            </div>
                        </div> */}

                    </div>
                </div>

                {showModal ? (
                    <>
                        <div className="flex  justify-center z-50 fixed inset-0 left-[50px] right-[50px]  top-[150px] h-[350px] sm:h-[300px]  ">
                            <div className='bg-[#E2E2E2] w-[500px]  flex flex-col  justify-start shadow-md'>
                                <div className='flex justify-between w-full border-b-[1px] border-[#374151]'>
                                    <div></div>
                                    <div className='text-[20px] font-bold'>Message</div>
                                    <div className='p-[10px] h-[40px]'><AiOutlineClose size={20} onClick={() => setShowModal(false)} /></div>
                                </div>
                                <div className='flex justify-between mt-[5px] sm:mt-[0px] px-[10px]'>
                                    <div className='w-[100%] text-[18px]'>
                                        {message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                    null}
            </Sidebar>
        </div>
    )
}

export default Message