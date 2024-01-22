import React from 'react';
import {
    MobileColumnFixed,
    MobileOptionColumn,
  } from "../../container/helper";
import VoteButton from '../UpvoteButton';
import { ReactSelectStyleSm } from '../../lib/reactselectstyles';
import { columns } from '../../lib/columns';
import { ListItem } from '../../types/pages/calls';
import { Column } from '.';

const MobileTable: React.FC<MobileTableProps> = ({ listItems, columnSettings, priceHistoryColor }) => {
  return (
    <div className="p-4 w-full text-regal-white rounded-lg lg:hidden">
      <div className="grid grid-cols-4 mb-1 gap-4 text-sm">
            <MobileColumnFixed name="CHAIN" />
            <MobileColumnFixed name="TOKEN" />
            <MobileColumnFixed name="VOTES" />
          </div>
          {/* list start */}
          <div className="overflow-y-scroll overflow-scroller h-[60vh]">
            {listItems && listItems.map((listItem, index) => {
              const {
                _id,
                chain,
                token,
                posted,
                votes,
                upvote_status,
                downvote_status,
              } = listItem;
              return (
                <div
                  key={index}
                  className="collapse collapse-plus py-1 calls-items-border"
                >
                  <input type="checkbox" />
                  <div className="grid grid-cols-4 px-0 gap-4 collapse-title text-base">
                    <MobileColumnFixed name={chain} />
                    <MobileColumnFixed name={token} />
                    <div className="flex flex-row items-center justify-between">
                      <MobileColumnFixed name={votes} />
                      <div
                        className="flex flex-row items-center justify-center gap-3 "
                      >
                        <VoteButton isUpvote={true} status={true} vote={()=>{}} />
                        <VoteButton isUpvote={false} status={true} vote={()=>{}} />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg collapse-content grid grid-cols-2 gap-4 mb-2 bg-[#2A2F50]">
                    <MobileOptionColumn
                      id="column_one"
                      column={columnSettings.columnOne}
                      setColumn={columnSettings.setColumnOne}
                      ReactSelectStyleSm={ReactSelectStyleSm}
                      columns={columns}
                      priceHistoryColor={priceHistoryColor}
                      listItem={listItem}
                    />
                    <MobileOptionColumn
                      id="column_two"
                      column={columnSettings.columnTwo}
                      setColumn={columnSettings.setColumnTwo}
                      ReactSelectStyleSm={ReactSelectStyleSm}
                      columns={columns}
                      priceHistoryColor={priceHistoryColor}
                      listItem={listItem}
                    />
                    <MobileOptionColumn
                      id="column_three"
                      column={columnSettings.columnThree}
                      setColumn={columnSettings.setColumnThree}
                      ReactSelectStyleSm={ReactSelectStyleSm}
                      columns={columns}
                      priceHistoryColor={priceHistoryColor}
                      listItem={listItem}
                    />
                    <MobileOptionColumn
                      id="column_four"
                      column={columnSettings.columnFour}
                      setColumn={columnSettings.setColumnFour}
                      ReactSelectStyleSm={ReactSelectStyleSm}
                      columns={columns}
                      priceHistoryColor={priceHistoryColor}
                      listItem={listItem}
                    />
                    <MobileOptionColumn
                      id="column_five"
                      column={columnSettings.columnFive}
                      setColumn={columnSettings.setColumnFive}
                      ReactSelectStyleSm={ReactSelectStyleSm}
                      columns={columns}
                      priceHistoryColor={priceHistoryColor}
                      listItem={listItem}
                    />
                    <div className="flex flex-col items-start justify-start pt-4">
                      <p className="px-1 w-full mb-1 text-md">
                        Posted
                      </p>
                      <p className="px-1 text-xl">{posted}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/*(!whitelisted || !user || user.access_level < 1) && (
              <AccessDenied
                header="Subscription Required"
                message="Please purchase a subscription using the sidebar to access this data."
              ></AccessDenied>
            )*/}
          </div>
    </div>
  );
};

export default MobileTable;

interface ColumnSetting {
  columnOne: Column;
  columnTwo: Column;
  columnThree: Column;
  columnFour: Column;
  columnFive: Column;
  setColumnOne: (column: Column) => void;
  setColumnTwo: (column: Column) => void;
  setColumnThree: (column: Column) => void;
  setColumnFour: (column: Column) => void;
  setColumnFive: (column: Column) => void;
}

interface MobileTableProps {
  listItems: ListItem[];
  columnSettings: ColumnSetting;
  priceHistoryColor: (listItem, column) => void;
}
