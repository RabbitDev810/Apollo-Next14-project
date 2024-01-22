import React from 'react'

export default function TaxStructure() {
    return (
        <section className="bg-transparent">
            <div className="container mx-auto relative z-[1] py-60 w-full">
                <p className='font-sans-bold text-6lg text-center text-legal-white'>RoadMap</p>
                <img src='/RoadMap.png' className='roadmap pt-16' />
                <div className='flex flex-wrap w-8/10'>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>Launch</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            Listing on Uniswap V2 scheduled for the week of Dec. 17th
                        </p>
                    </div>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>Early Access</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            A select group of holders and marketers will be granted advanced access to our platform.
                        </p>
                    </div>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>Public Release</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            Apollo will be made available for widespread access, accompanied with staking.
                        </p>
                    </div>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>TG Bot</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            Custom TG Bot beta goes live with partnered projects.
                        </p>
                    </div>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>Gasless Swap</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            Offering users instant buy technology to better serve trading needs.
                        </p>
                    </div>
                    <div className="w-9/10 md:w-1/6 p-6 flex flex-col flex-grow flex-shrink items-center">
                        <p className='font-space font-bold text-md2 text-white-10'>AI Release</p>
                        <p className="fade-in-text font-space font-normal text-md3 text-left text-white-10">
                            First of its kind AI tool designed to use proprietary data to deliver unique sentiment analysis, and predictive trading insights.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
