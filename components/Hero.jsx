import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function Hero() {
    const countDownDate = new Date('2022-11-18 16:00:00').getTime();
    const offset = new Date().getTimezoneOffset()
    const date = new Date()
    date.setMinutes(new Date().getMinutes() + offset);
 
    const [countDown, setCountDown] = useState(
        countDownDate - date
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const offset = new Date().getTimezoneOffset()
            const date = new Date()
            date.setMinutes(new Date().getMinutes() + offset);
        
            setCountDown(countDownDate - date);
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return (
        <div className="hero overflow-visible fade-in-text pt-40">
            <img src="/first.png" alt="First" className='first-image' />
            <img src='/Group 58.png' alt='Star group' className='star-group-img' />
            <div className="container z-[1] px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center">
                <div className="relative flex flex-col w-full lg:w-3/5 justify-center items-center text-center md:text-left">
                    <div className='hero-cloud'></div>
                    <h1 className='font-lexend text-white font-normal 2xl:text-xl1 xl:text-xl2 lg:text-xl4 md:text-xl4 pb-10'>Introducing</h1>
                    <button className='border border-2 border-solid border-green-10 rounded-20 text-grey-10 2xl:text-xl3 xl:text-xl4 lg:text-8xl md:text-7xl font-lexend font-light shadow-2xl backdrop-blur-xl px-24'>Oracle AI</button>
                    <p className='font-satoshi py-4  text-normal 2xl:text-4lg xl:text-2xl lg:text-xl md:text-lg sm:text-base text-center'>See into the future...</p>
                    <button className="font-normal font-satoshi text-grey-100 text-5lg border border-2 rounded-50 p-100 gap-10">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}