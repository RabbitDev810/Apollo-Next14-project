import React from 'react'

export default function GetStarted() {
    return (
        <section className="bg-transparent lg:mt-[260px] lg:mb-[200px] pt-8 pb-16 px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col w-full w-full lg:w-3/5 justify-center items-start text-center md:text-left ">
                <h1 className="fade-in-text my-4 w-full text-center text-lg lg:text-[64px] text-regal-white font-extrabold">
                    Get Started Now
                </h1>
                <div className="flex justify-center w-full">
                    <button className="fade-in-text mx-auto lg:mx-0 bg-transparent text-regal-white text-[2rem] leading-[2.375rem] rounded-full my-6 py-[8px] px-[96px] focus:outline-none focus:shadow-outline border-2 border-regal-white">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    )
}
