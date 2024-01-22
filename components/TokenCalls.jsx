import React from 'react'
import {useEffect, useState} from "react"
import axios from "axios"

export default function TokenCalls() {
    const [calls, setCalls] = useState(1051)

    const getNumCalls = async () => {
        const {data} = await axios.get("/api/getnumcalls")
        setCalls(data)
    }

    useEffect(() => {
        getNumCalls()
    }, [])

    return (
        <section className="bg-transparent lg:py-40 relative">
            <div className="container mx-auto mt-8">
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="flex flex-wrap md:flex-col md:items-center lg:flex-row">
                    <div className="md:w-full lg:w-2/5 md:w-4/5 xl:mt-[80px] md:mt-[60px] md:mb-[40px]">
                        <h3 className="fade-in-text text-lg lg:text-[64px] md:text-center lg:text-left font-extrabold text-regal-white mb-4 2xl:mb-[40px]">
                            All token calls
                        </h3>
                        <p className="fade-in-text w-9/10 text-7lg text-base md:text-center lg:text-left leading-[140%] text-regal-white mb-[32px] 2xl:mb-[80px] xl:mb-[32px]">
                            See the latest token calls in real time simply and quickly
                        </p>
                        <div className="w-full flex justify-between flex-col sm:flex-row mb-[40px]">
                            <div className="text-left mb-[20px]">
                                <h3 className="shadow fade-in-text font-sans-bold text-6lg lg:text-[4rem] font-bold text-blue-10 mb-[16px]">+200</h3>
                                <p className="fade-in-text text-normal lg:text-[2rem] leading-[140%] text-7lg text-regal-white">
                                    Tracked Channels
                                </p>
                            </div>
                            <div className="text-left mb-[20px]">
                                <h3 className="shadow fade-in-text font-sans-bold text-6lg lg:text-[4rem] font-bold text-blue-10 mb-[16px]">+2500</h3>
                                <p className="fade-in-text text-normal lg:text-[2rem] leading-[140%] text-7lg text-regal-white">
                                    Calls
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-full lg:w-3/5 z-50 left-[1000px]">
                        <img src="./MacBook Pro 16.png" alt=""/>
                    </div>
                        <img src="/blue-cloud.png" alt="Coins" className='blue-cloud z-0'/>
                </div>
            </div>
        </section>
    )
}
