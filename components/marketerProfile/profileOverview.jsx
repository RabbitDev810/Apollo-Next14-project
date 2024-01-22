import Image from "next/image";
import React, { useEffect, useState } from "react";
import source from "../../public/prfile.png";
import { BsTelegram } from "react-icons/bs";
import Link from "next/link";

const ProfileSection = ({ source, channelName, Followers }) => {
  return (
    <div className="flex flex-row items-center lg:flex-col relative">
      {/* <Image
        src={source}
        alt="profile"
        className="rounded-full w-[96px] h-[96px] lg:w-[112px] lg:h-[112px] lg:absolute lg:-translate-y-[100px]"
      /> */}
      {/* change to lg:pt-10 after profile is there */}
      <div className="ml-4 lg:flex lg:flex-col lg:justify-center lg:items-center lg:ml-0 lg:pt-1">
        <div className="text-[22px] text-[#fff]"> {channelName} </div>
        <div className="flex flex-row items-center">
          <div className="text-[14px] text-[#808080]">Followers</div>
          <div className="font-bold ml-2 text-[16px] text-[#fff]">
            {Followers}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = ({ TotalBurnt, TotalHoldings, PostsPerWeek }) => {
  return (
    <div className="flex flex-row items-center justify-between mt-6">
      {/* <div className="p-2">
        <div className="text-[14px] text-[#808080]">Total Burnt</div>
        <div className="text-[20px] text-[#fff]">{TotalBurnt}</div>
      </div>
      <div className=" hidden md:flex w-[1px] h-[35px] bg-[#808080]"></div>
      <div className="p-2">
        <div className="text-[14px] text-[#808080]">Total Holdings</div>
        <div className="text-[20px] text-[#fff]">{TotalHoldings}</div>
      </div>
      <div className="hidden md:flex w-[1px] h-[35px] bg-[#808080]"></div> */}
      <div className="p-2">
        <div className="text-[14px] text-[#808080]">Posts Per Week</div>
        <div className="text-[20px] text-[#fff]">{PostsPerWeek}</div>
      </div>
    </div>
  );
};

const FollowButton = ({ Name, ChangeFollowStatus, follow_status }) => {
  return (
    <div className="mt-6">
      <button
        className={`w-[100%] py-2 rounded-[10px] hover:bg-[#4e79e4] transition-[300ms] ${
          follow_status ? "bg-[rgb(64,114,238)] opacity-30" : "bg-[#4072EE]"
        } text-[#fff]`}
        onClick={() => ChangeFollowStatus()}
      >
        {follow_status ? "Unfollow" : Name}
      </button>
    </div>
  );
};

const About = ({ source, description }) => {
  return (
    <div className="mt-[40px] flex flex-col">
      <div className="flex flex-row items-center">
        <Image alt="icon" src={source} />
        <div className="text-[#808080] font-[600] ml-4 leading-5">About</div>
      </div>
      <p className="text-[#EAEAEA] text-[12px] font-[400] mt-6">
        {description}
      </p>
    </div>
  );
};

const TelegramSection = ({ TelegramName, telegramLink }) => {
  return (
    <div>
      <div className="flex flex-row items-center mt-[30px]">
        <BsTelegram color="#00acee" />
        <div className="text-[#808080] ml-4 font-[600]">Telegram</div>
      </div>
      <Link
        href={telegramLink ? telegramLink : "#"}
        className="text-[12px] text-[#247BCA] underline mt-1"
      >
        {TelegramName}
      </Link>
    </div>
  );
};

const Box = ({ content, contentName }) => {
  return (
    <div
      data={contentName}
      className={`text-[32px] relative text-[#fff] ml-4 font-[600] ${
        contentName &&
        "after:absolute after:content-[attr(data)] after:text-[#fff] after:bottom-0 after:translate-y-12 after:translate-x-8 after:text-[24px] after:font-[600]"
      } rounded-[5px] w-[46px] h-[55px] flex items-center justify-center text-center bg-[#27323E] border-[1px] border-solid border-[#376996]`}
    >
      {content}
    </div>
  );
};

const Seperator = () => {
  return <div className="text-[32px] text-[#fff] font-bold mx-6">:</div>;
};

const CallSection = ({}) => {
  return (
    <div className="flex flex-col mt-10">
      <div className="text-[20px] text-[#fff] font-[600]"> Next Call </div>
      <div className="mt-6 flex flex-row items-center justify-center">
        <Box content={"0"} />
        <Box content={"0"} />
        <Seperator />
        <Box content={"0"} />
        <Box content={"0"} />
      </div>
    </div>
  );
};

const CallSectionDescription = ({}) => {};

export const ProfileOverview = ({
  telegramLink,
  TelegramName,
  PostsPerWeek,
  TotalBurnt,
  TotalHoldings,
  Followers,
  ChangeFollowStatus,
  follow_status,
}) => {
  return (
    <section className="bg-[#141524] w-[92%] rounded-[25px] lg:w-[38.5%] py-[42px] px-[20px] mt-2">
      <ProfileSection
        source={source}
        channelName={TelegramName}
        Followers={Followers}
      />
      <StatsSection
        TotalBurnt={TotalBurnt}
        TotalHoldings={TotalHoldings}
        PostsPerWeek={PostsPerWeek}
      />
      <FollowButton
        Name={"Follow"}
        ChangeFollowStatus={ChangeFollowStatus}
        follow_status={follow_status}
      />
      {/* <About
        source={AboutIcon}
        description={
          "Sven Nordström Johannes Lundqvist. Peter Johansson. Anita Åström Margaretha Åström. Arvid Johansson Arne Therese Axelsson. Christina Hermansson Alice Svensson. Viola Eliasson Maria Blom. Nibelt bevak. Niliga Nils Eliasso"
        }
      /> */}
      <TelegramSection
        telegramLink={telegramLink}
        TelegramName={"@" + TelegramName}
      />
      <CallSection />
    </section>
  );
};
