import React from 'react'
import banner from '../../../public/bazar-hero.png'
import Image from 'next/image';

const Banner = () => {

const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

  return (
    <div className='my-5'>
        <div className='flex items-center justify-between'>
            <div>
                <span className='bg-green-200 py-1 px-2 text-sm text-green-500 rounded-full'>{date}</span>

                <h1 className='py-3 text-2xl font-extrabold'>আজকের বাজারের দাম এক নজরে</h1>
                <p className='text-sm text-gray-400 max-w-xl'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার 
                    দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন 
                    এক জায়গায়।</p>

                    <div className='py-5'>
                        <button className='bg-green-700 py-2 px-3 cursor-pointer text-white font-bold rounded-sm'>সব পণ্য দেখুন</button>
                    </div>
            </div>

            <div>
                <Image src={banner} alt='banner image' width={355} height={355} />
            </div>
        </div>
    </div>
  )
}

export default Banner