import Image from "next/image";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import SpaceBackground from "../../public/SPACE-background.svg";

export const TopSection = ({
  address,
  setAddress,
  handleChainFilterClick,
  chainFilter,
  user,
}) => {
  return (
    <section className="w-full flex justify-center relative">
      <div className="absolute min-h-[75vh] w-full bg-gradient-to-b from-[#080f1500] to-[#080f15]" />
      
      <Image
        src={SpaceBackground}
        alt="space"
        className="absolute top-0 left-0 min-h-[75vh] max-w-[100vw] object-cover opacity-75"
      />
      <Sidebar
        key={process.env.API_KEY}
        address={address}
        setAddress={setAddress}
        user={user}
      />
      <Nav user={user} isoverlay={true}/>
      <div className="flex items-center flex-col w-full mt-28">
        <h3 className="fade-in-text text-5xl text-center font-extrabold text-regal-white mb-[0.75rem] xl:mb-[2rem] 2xl:mb-[2rem] ">
          Welcome to Apollo
        </h3>
        <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl text-center leading-[150%] text-regal-white mb-[1.5rem] xl:mb-[2.25rem] 2xl:mb-[2.25rem] ">
          Here you can follow the latest calls and metrics from across all of
          our tracked channels
        </p>
        <p className="fade-in-text text-2xl text-center leading-[150%] text-regal-white mb-[2rem] xl:mb-[3.25rem] 2xl:mb-[3.25rem]">
          Select one of the chains below
        </p>
        {/* Cards */}
        <div
          id="cards"
          className="flex flex-row gap-[1.25rem] md:gap-[2.5rem] mb-[2rem] md:mb-[4rem]"
        >
          <div
            onClick={() => handleChainFilterClick("BSC")}
            className={`card ${
              chainFilter === "BSC"
                ? "bg-[#E2AA1A]/[0.4]"
                : "bg-[#E2AA1A]/[0.2]"
            } w-[108px] h-[108px] md:w-[234px] md:h-[80px] flex flex-col md:flex-row justify-center items-center cursor-pointer backdrop-blur-sm`}
          >
            <Image
              src="/binance.png"
              alt="binance"
              width={100}
              height={100}
              className="w-[40px] h-[40px] md:w-[54px] md:h-[54px] mb-[12px] md:mb-0"
            />
            <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl md:text-xl text-center leading-[150%] font-[600] text-regal-white">
              Smart Chain
            </p>
          </div>
          <div
            onClick={() => handleChainFilterClick("ETH")}
            className={`card ${
              chainFilter === "ETH"
                ? "bg-[#376996]/[0.4]"
                : "bg-[#376996]/[0.2]"
            } w-[108px] h-[108px] md:w-[234px] md:h-[80px] flex flex-col md:flex-row justify-center font-[600] items-center backdrop-blur-sm cursor-pointer`}
          >
            <Image
              src="/ethereum.png"
              alt="eth"
              width={100}
              height={100}
              className="w-[25px] h-[42px] md:w-[41px] md:h-[67px] mb-[12px] md:mb-0"
            />
            <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl md:text-xl text-center leading-[150%] font-[600] text-regal-white">
              Ethereum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
