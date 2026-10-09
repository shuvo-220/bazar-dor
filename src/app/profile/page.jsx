"use client"
import { useSession } from '@/lib/auth-client'
import React from 'react'

const ProfilePage = () => {

    const { data: session ,isPending } = useSession();
    const user = session?.user;

  return (
    <div className='py-10'>
        <div>

            <div>
                <div className='flex items-center justify-between py-4 px-6 border border-gray-300'>
                    <div>
                        <h3>{user?.name}</h3>
                        <span>{user?.email}</span>
                    </div>

                    <div>
                        <button>↩ সাইন আউট</button>
                    </div>

                </div>
                <div></div>
            </div>

            <div></div>

        </div>
    </div>
  )
}

export default ProfilePage