import Spinner from "../spinner";
import MarketerItem from "./MarketerItem";

export default function MarketerList({ marketers }) {
  return (
    <div className="flex flex-wrap justify-center items-center lg:mx-[100px] mx-[50px] ">
      <div className="w-full">
        <h3 className="text-[30px] text-white font-semibold">
          ({marketers.length}) Search results found
        </h3>
      </div>
      {marketers.length < 1 && (
        <div className="w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {marketers.map((item, index) => {
        console.log(item);
        return (
          <MarketerItem
            key={index}
            data={{
              channelID: item.channel_id,
              channelName: item.channel_name,
              calls: item.call,
              multiplier: item.average,
              members: item.count,
            }}
          />
        );
      })}
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
      <MarketerItem />
    </div>
  );
}
