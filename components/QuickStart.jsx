import React from 'react'

export default function QuickStart() {
    return (
        <section className="bg-transparent relative pt-[500px] pb-[600px]">
            <img src='/Png 6.png' className='absolute top-0 z-0 left-[-210px]' />
            <img src='/rocket.png' className='absolute top-[300px] z-0 left-[290px] w-[507px]'/>
            <img src='/Png 5.png' className='absolute top-[-1430px] z-0 w-[2000px] h-auto' />
            <img src='/elipse-cloud.png' className='absolute z-0 w-[361px] h-auto' />
            <div className="container mx-auto flex flex-col justify-center items-center">
                <p className='font-sans font-black text-6lg text-grey-100 text-center py-8 z-10'>Get Started Now</p>
                <button className="font-normal font-satoshi text-grey-100 text-5lg border border-2 z-10 rounded-50 p-100 gap-10">
                    Get Started
                </button>
            </div>
        </section>
    )
}
