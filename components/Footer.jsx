import React from "react";
import Link from "next/link";

const LinkItem = ({ img, text, href }) => {
  return (
    <Link href={href}>
      <div className="flex flex-row gap-5 mb-5 cursor-pointer transition-all hover:scale-105">
        <img src={img} className="h-5 my-auto" />
        <p className="my-auto">{text}</p>
      </div>
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#070C10] pb-6 pt-10 z-10">
      <div className="container mx-auto mb-10 z-10">
        <div className="flex justify-between flex-col items-center lg:flex-row lg:items-auto">
          <img src="/Apollo-icon.png" alt="Apollo" className="w-2/6"/>
          <div className="flex justify-between w-2/6">
            <div className="w-2/5 text-left"> 
              <h4 className="text-white text-7lg font-medium">
                Links
              </h4>
              <p className="font-sans font-normal text-legal-white">About Us</p>
              <p className="font-sans font-normal text-legal-white">Calls</p>
              <p className="font-sans font-normal text-legal-white">Marketers</p>
              <p className="font-sans font-normal text-legal-white">Channels</p>
            </div>
            <div className="w-2/5 text-left">
              <h4 className="text-white text-7lg font-medium">Contact</h4>
              <p className="font-sans font-normal text-legal-white">contact@apollo.com</p>
              <p className="font-sans font-normal text-legal-white">+99 9999 999 99</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex mx-auto w-2/5 justify-around">
          <p className="text-legal-white font-sans font-normal text-4lg">Privacy Policy</p>
          <p className="text-legal-white font-sans font-normal text-4lg">Terms And Conditions</p>
        </div>
        <p className="text-legal-white font-sans font-normal text-4lg text-right w-3/5 items-end justify-items-end">
          © 2022 - Apollo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
