import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../App.css"

//image
import logo from "./../assets/neeraj_logo.png"

//icons
import { CiMenuBurger } from "react-icons/ci"
import { FiUserCheck } from "react-icons/fi"
import { IoPeopleOutline } from "react-icons/io5"
import {BsChatDots} from "react-icons/bs"
import axios from "axios";
import { API } from "./constant";

const Sidebar = ({ children }) => {
    const [openSidebar, setopenSidebar] = useState(false)
    const [status, setStatus] = useState('')
    const [loggedIn, setIsLoggedIn] = useState("")

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
    const varios_user_status = async () => {
        axios.put(`${API}/check-status`, {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                // console.log(res.data.data.status)
                setStatus(res.data.data.status)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        varios_user_status()
    }, [])

    const logout = async () => {
        await axios.post(`${API}/logout/logout`, {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                // console.log(res.data)
                alert(res.data.message)
                localStorage.removeItem("token")
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            {loggedIn === false ? (<><h1>Not logged In</h1></>) : (
                <div className="md:flex">
                    <div className={`${openSidebar ? 'fixed top-0' : "hidden"} md:mt-[0px]  md:flex flex-col h-screen overflow-y-scroll yscrollbar py-3 bg-gray-800 shadow w-[250px] shrink-0`}>
                        <div className="space-y-3">
                            {/* <div className="md:hidden">
                        <div className="flex justify-end text-white">close</div>
                    </div> */}
                            <div className="flex items-center px-[15px]">
                                <h2 className="text-xl font-bold text-white">Dashboard</h2>
                            </div>

                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <Link to="/dashboard">
                                        <li className="rounded-sm hover:bg-slate-400">
                                            <a
                                                href="#"
                                                className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-gray-100"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                                <span className="text-gray-100">Dashboard</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="/Services">
                                        <li className="rounded-sm hover:bg-slate-400">
                                            <a
                                                href="#"
                                                className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-gray-100"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                    />
                                                </svg>
                                                <span className="text-gray-100">Services</span>
                                            </a>
                                        </li>
                                    </Link>
                                    <Link to="/user-profile ">
                                        <li className="rounded-sm hover:bg-slate-400">
                                            <a
                                                href="#"
                                                className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                            >
                                                <FiUserCheck color="#ffffff" size={24} />
                                                <span className="text-gray-100 ">Profile</span>
                                            </a>
                                        </li>
                                    </Link>
                                    <Link to="/login-user">
                                        <li className="rounded-sm hover:bg-slate-400">
                                            <a
                                                href="#"
                                                className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                            >
                                                <IoPeopleOutline size={24} color="#ffffff" />
                                                <span className="text-gray-100">User</span>
                                            </a>
                                        </li>
                                    </Link>
                                    <Link to="/message">
                                        <li className="rounded-sm hover:bg-slate-400">
                                            <a
                                                href="#"
                                                className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                            >
                                                <BsChatDots size={22} color="#ffffff" />
                                                <span className="text-gray-100">Messages</span>
                                            </a>
                                        </li>
                                    </Link>
                                    <li className="rounded-sm hover:bg-slate-400 " onClick={logout}>
                                        <a

                                            className="flex items-center p-2 px-[20px] space-x-3 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            <span className="text-gray-100">Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* mobile menu navbar */}
                    <div className="md:hidden fixed top-0 flex justify-between w-full bg-white h-[50px] border-b">
                        <div className="w-[50px] ml-4 flex justify-center items-center"><CiMenuBurger size={30} onClick={() => setopenSidebar(!openSidebar)} /></div>
                        <div className="py-[4px]">
                            <Link to="/user-profile">
                                <div className='mx-[30px] w-[60px] h-full p-[5px] rounded-md bg-black'>
                                    <img src={logo} alt="brand logo" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full" onclick={() => setopenSidebar(false)}>
                        < ><div onClick={() => setopenSidebar(false)}>{children}</div></>
                    </div>
                </div>
            )}

        </>
    );
}
export default Sidebar;