import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MarketerItem({ data }) {
  const [isHover, setHover] = useState(false);
  const [truncatedName, setTruncatedName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    if (data.channelName.length > 30)
      setTruncatedName(data.channelName.slice(0, 30) + "...");
    else setTruncatedName(data.channelName);
  }, [data]);

  return !!data ? (
    <div
      onClick={() => {
        router.push(`/marketerProfile/${data.channelID}`);
      }}
      className="relative flex p-[20px] flex-col w-[320px] 2xl:w-[360px] 2xl:h-[220px] h-[200px] bg-[#191B2B] border-[1px] border-[#008CE7] rounded-[24px] m-[20px] shadow-none hover:shadow-3xl duration-500 transition-all cursor-pointer"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="flex mt-[10px] items-center">
        <div className="fex felx-col justify-center text-white ml-[10px]">
          <p className="text-[1.25rem]">{truncatedName}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mx-[10px] mt-[10px] text-white flex-col md:flex-row">
        <div className="flex flex-row md:flex-col justify-center items-center mb-4 md:mb-0">
          <p className="text-center text-[1.5rem] font-bold">{data.calls}</p>
          <p className="text-center text-[15px] pl-5 md:pl-0 md:mt-[6px]">Calls per day</p>
        </div>
        <div className="flex flex-row md:flex-col justify-center items-center mb-4 md:mb-0">
          <p className="text-center text-[1.5rem] font-bold">
            {data.multiplier}
          </p>
          <p className="text-center text-[15p] pl-5 md:pl-0 md:mt-[6px]">Avg. Multiplier</p>
        </div>
        <div className="flex flex-row md:flex-col justify-center items-center mb-4 md:mb-0">
          <p className="text-center text-[1.5rem] font-bold">{data.members}</p>
          <p className="text-center text-[15p] pl-5 md:pl-0 md:mt-[6px]">Followers</p>
        </div>
      </div>
      <div className="absolute w-full left-0 -bottom-[19px] grow flex justify-center items-center">
        <button
          className="h-[38px] w-[171px] rounded-full text-white transition-all"
          style={{
            backgroundColor: isHover ? "#3AB03E" : "#893168",
          }}
        >
          View
        </button>
      </div>
    </div>
  ) : (
    <div className="w-[320px] 2xl:w-[360px] m-[20px]"> </div>
  );
}
