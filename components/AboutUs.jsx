import React from 'react'

export default function AboutUs() {
    return (
        <section className="bg-transparent about-us pt-40">
            <div className="container mx-auto m-8 flex">
                <div className='w-3/6'>
                    <h3 className="fade-in-text text-6lg font-satoshi md:text-center lg:text-left font-extrabold text-regal-white font-bold mb-[16px] 2xl:mb-[40px] xl:mb-[16px]">
                        About us
                    </h3> 
                    <p className="fade-in-text text-base md:text-center lg:text-left leading-[150%] text-regal-white">
                        A bonld new technology allowing investors to see beyond KOL (key opinion leader) influence; using data analytics and predictive models to mitigate market inefficiencies and create a trading advantage. With Oracle AI not only will you be earlier, you’ll make better choices. Oracle AI’s KOL tracker compiles data for the purpose of aggregating trends, sentiment swings, and emerging “metas” to better equip the common trader with the insight needed to remain competitive in a volatile marketplace. These insights will be queryable, by way of the Oracle AI.
                    </p>
                </div>
                <div className='grid items-center justify-items-center w-3/6'>
                    <img src="/logoo 2.png" alt="Coins" className='absoulte w-[261px] h-[264px] z-30'/>
                    <img src='/Ellipse 8.png' className='absolute w-[533px] h-[533px] z-20'></img>
                    <img src='/Ellipse 7.png' className='absolute w-[650px] h-[650px]'></img>
                </div>
           </div>
        </section>
    )
}
