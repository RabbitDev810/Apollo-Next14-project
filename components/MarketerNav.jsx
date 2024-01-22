import { useEffect, useState } from "react";

const MarketerNav = () => {
    return (
        <nav id="header" className={`bg-transparent w-full -z-10`} >
            <div className="w-full container mx-auto flex items-center justify-between mt-0 py-2 px-2">
                <div className="max-w-[60px] sm:max-w-[90px] flex items-center">
                    <a className="text-[24px] flex justify-center items-center" href="#">
                        <div className="w-[40px] h-[40px]">
                            <img src="/apollo1.png" alt="Apollo" />
                        </div>
                        <p className="font-bold text-white ml-[12px]"> Apollo </p>
                    </a>
                </div>
                <div className="flex flex-wrap justify-center items-center">
                    <a href="" className="mx-2 sm:mx-5 text-[14px] sm:text-[20px] text-white">Calls</a>
                    <a href="" className="mx-2 sm:mx-5 text-[14px] sm:text-[20px] text-white">Marketers</a>
                </div>
                {/* <button className="text-[14px] sm:text-[24px] px-2 sm:px-8 py-2 started text-white">Get Started</button> */}
            </div>
        </nav>
    )
}

export default MarketerNav;