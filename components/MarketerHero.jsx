import React, { useEffect, useState } from 'react'
import {DebounceInput} from 'react-debounce-input'

export default function MarketerHero({setSearchQuery}) {
    const [tempQuery, setTempQuery] = useState("")

    return (
        <div className="hero overflow-visible fade-in-text relative">
            {/* <img src="/marketerbg.png" alt='' className='absolute lg:top-[143px] top-[50px] w-[50vw]' /> */}
            <div className="container z-[1] px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
                <div className="relative flex flex-col w-full justify-center items-center text-center md:text-left">
                    <h1 className='mt-[120px] text-white text-3xl text-center flex justify-center items-center'>
                        Marketer Search
                        <span className='w-10 h-10 ml-5'>
                            <img src="/apolloVector@2x.png" alt="Apollo"/>
                        </span>
                    </h1>
                    <div className='2xl:h-[60px] backdrop-blur-lg bg-white/5 p-[10px] h-[72px] mt-[61px] md:ml-[50px] md:mr-[50px] mb-[200px] w-full max-w-[750px] border-[1px] border-white rounded-full flex items-center'>
                        {/*<div className='w-[16px] h-[16px]'>
                            <img src="/search.png" className='ml-[18px]' alt="Search"/>
                        </div>*/}
                        <input onChange={(e)=>{setTempQuery(e.target.value)}} placeholder=' FIND MARKETER' className='outline-none my-2 flex-grow bg-transparent'/>
                        <button onClick={()=>{setSearchQuery(tempQuery)}} className='rounded-full bg-white h-full text-black font-semibold px-[24px] lg:w-[250px]'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}