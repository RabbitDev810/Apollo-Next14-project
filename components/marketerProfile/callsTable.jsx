import React from "react";
import Calls from "../../pages/calls";

const Header = () => {
  return (
    <main className="flex flex-row justify-between items-center mb-8">
      <div className="flex-grow-0 order-1 font-bold text-[#EAEAEA] text-[24px]">
        Calls
      </div>
      {/* <div className="text-[#EAEAEA] text-[14px] flex-grow-0 order-1">
        View all
      </div> */}
    </main>
  );
};

export const CallsTable = ({ channelID, callback, access_level, session }) => {
  console.log("Channel ID:")
  console.log(channelID)
  return (
    <section
      className={`bg-[#141524] mt-2 rounded-[25px] w-[100%] pt-[42px] pb-4 px-[20px] ${
        access_level === 0 && 'backdrop-blur-sm'
      }`}
    >
      <Header />
      <Calls
        channelName={channelID}
        callback={callback}
        user={{ access_level }}
        session={session}
      />
    </section>
  );
};
