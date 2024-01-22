import React from "react";
import Logo from "../../public/main-logo.svg";
import Image from "next/image";
import WalletLogo from "../../public/wallet.svg";
import Link from "next/link";

const ConnectButton = () => {
  return (
    <React.Fragment>
      <button className="bg-[#893168] px-[20px] py-[8px] rounded-full flex flex-row items-center justify-between flex-2 order-0 flex-grow-0">
        <Image src={WalletLogo} alt="wallet" />
        <div className="text-[#EAEAEA] ml-2 font-bold lg:hidden">Connect</div>
        <div className="text-[#EAEAEA] ml-2 font-bold hidden lg:block">
          Connect to Wallet
        </div>
      </button>
    </React.Fragment>
  );
};

export const Navbar = () => {
  return (
    <nav className="flex md:bg-transparent absolute top-0 left-0 z-20 w-[100%] bg-[#090A11] flex-row items-center justify-between px-[32px] py-[16px] mb-2 lg:backdrop-blur-[10px] lg:bg-blend-lighten lg:bg-[rgba(20, 14, 24, 0.3)]">
      <div className="lg:flex lg:flex-row lg:w-[150px] lg:items-center lg:justify-around">
        <Image src={Logo} alt="main" />
        <div className="font-[800] text-[#fff] text-[24px] hidden lg:block">Apollo</div>
      </div>
      <div className="flex-row w-[200px] flex lg:flex justify-end items-center">
        <Link href={"/calls"} className="font-[400] text-[18px] text-[#fff] cursor-pointer focus:font-[600]">Calls</Link>
        <Link href={"/marketers"} className="font-[400] text-[18px] text-[#fff] ml-8 cursor-pointer focus:font[600]">Marketers</Link>
      </div>
      {/* <div className="flex flex-row items-center justify-center w-[50%] max-w-[198px] lg:max-w-[300px]">
        <ConnectButton />
        <Image
          alt="menu"
          className="ml-8 flex-1 flex-grow-0 w-[24px] h-[24px] block lg:hidden"
          src={MenuIcon}
        />
      </div> */}
    </nav>
  );
};
