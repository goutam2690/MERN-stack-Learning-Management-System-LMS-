import React from 'react'
import { Link } from 'react-router-dom'
import HomeLayout from '../../Layouts/HomeLayout'
import { RxCrossCircled } from 'react-icons/rx'

const CheckOutFailure = () => {
  return (
    <HomeLayout>
    <div className='min-h-[90vh] flex items-center justify-center text-white'>
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative'>
            <h1 className='bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center'>Payment Failed !!</h1>

            <div className='px-4 flex flex-col items-center justify-center space-y-2'>
                <div className='text-center space-y-2'>
                    <h2 className='text-lg font-semibold'>Oops !! your payment failed</h2>
                    <p className='text-left'>Please try again later</p>
                </div>
            </div>

            <RxCrossCircled className='text-red-500 text-5xl m-5'/>

            <Link to="/checkout" className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 left-0 w-full py-3 font-bold text-lg text-center' >
                <button >
                    Try Again
                </button>
            </Link>
        </div>

    </div>
</HomeLayout>
  )
}

export default CheckOutFailure
