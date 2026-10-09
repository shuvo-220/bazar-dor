"use client"
import { useSession } from '@/lib/auth-client'
import React from 'react'

const ProfilePage = () => {

    const { data: session ,isPending } = useSession();
    const user = session?.user;

  return (
    <div className='py-10 max-w-7xl mx-auto'>
        <div>

            <div>
                <div className='flex items-center justify-between py-4 px-6 border border-gray-300 rounded-md'>
                    <div>
                        <h3  className='text-gray-500 font-semibold'>{user?.name}</h3>
                        <span  className='text-gray-500 font-semibold'>{user?.email}</span>
                    </div>

                    <div>
                        <button className='border border-red-500 py-2 px-4 text-red-600 font-semibold rounded-md'>↩ সাইন আউট</button>
                    </div>

                </div>
            </div>

            <div className='border border-gray-300 rounded-md py-5 px-5  mt-10'>
                <h3 className='text-gray-500 font-semibold py-5'>তথ্য</h3>
                <div className='flex items-center '>
                    <form>
                        <div><label>নাম </label></div>
                        <input type='text' className='border border-gray-300 rounded-md py-1 px-4' />
                        <div className='mt-3'>
                            <button className='bg-green-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-green-700'>আপডেট</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProfilePage