import Image from 'next/image'
import React from 'react'
import logo from '../../../public/logo-icon.png'
import Link from 'next/link';

const Navbar = async () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data = await res.json();

    return (
        <div>
            <div className='flex items-center justify-between py-5 bg-white'>
                <div className='flex gap-3'>
                    <Image src={logo} alt='logo' width={25} height={25}
                    />
                    <div>
                        <h2 className='text-2xl font-bold'>বাজার দর</h2>
                        <span className='text-sm'>{date}</span>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <Link href='/signin'>সাইন ইন</Link>
                    <Link href='/signup' className='bg-green-700 text-white py-1 px-3 rounded-sm font-bold'>সাইন আপ</Link>
                </div>
            </div>

            <div className='flex gap-5 justify-center'>
                {
                    data.map((nav, i) => <Link key={i} href='/'>
                        <span>{nav.icon}</span>
                        <span>{nav.nameBn}</span>
                    </Link>)
                }
            </div>

        </div>
    )
}

export default Navbar