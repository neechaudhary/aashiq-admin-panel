import React from 'react'
import Sidebar from './Sidebar'
import User_table_list from './User_table_list'

//icons
import { AiOutlineUserSwitch } from 'react-icons/ai'
import Multiple_user from './Multiple_user'


const Users = () => {
  return (
    <div>
        <Sidebar>
        <div className='sm:p-[20px] h-screen  overflow-y-scroll mt-[50px] md:mt-0'>
            <div className='w-full py-[8px] px-[5px] shadow-md border flex justify-between mb-[10px]'>
              <div className='flex items-center'>
                <div className='w-[50px] '>
                  <AiOutlineUserSwitch className='w-full' size={30} />
                </div>
                <div className='font-bold text-[20px]'>
                  User
                </div>

              </div>
              <div className='invisible'>
             hidden div

              </div>
            </div>

            <Multiple_user />
          </div>
        </Sidebar>
    </div>
  )
}

export default Users