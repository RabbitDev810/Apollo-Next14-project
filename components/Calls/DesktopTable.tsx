import React from 'react';
import {
    OptionColumn,
  } from "../../container/helper";
import VoteButton from '../UpvoteButton';
import { generateTableData, openInDexscreener } from "../../lib/calls/helpers";
import { ReactSelectStyleSm } from '../../lib/reactselectstyles';
import { columns } from '../../lib/columns';
import { ListItem } from '../../types/pages/calls';
import { Column } from '.';

const DesktopTable: React.FC<DesktopTableProps> = ({ listItems, columnSettings, chainFilter, channelName }) => {
  return (
    <div className="text-left w-full text-regal-white hidden lg:block">
      <div className="grid grid-flow-col auto-cols-fr mb-1 gap-2 text-xs">
            <div className="rounded-md flex items-center justify-start cursor-pointer">
              CHAIN
            </div>
            <div className="rounded-md flex items-center justify-start cursor-pointer">
              TOKEN
            </div>
            {channelName ? null : (
              <OptionColumn
                columns={columns}
                column={columnSettings.columnOne}
                id="column_one"
                ReactSelectStyleSm={ReactSelectStyleSm}
                setColumn={columnSettings.setColumnOne}
              />
            )}
            {channelName ? null : (
              <OptionColumn
                columns={columns}
                column={columnSettings.columnTwo}
                id="column_two"
                ReactSelectStyleSm={ReactSelectStyleSm}
                setColumn={columnSettings.setColumnTwo}
              />
            )}
            <OptionColumn
              columns={columns}
              column={columnSettings.columnThree}
              id="column_three"
              ReactSelectStyleSm={ReactSelectStyleSm}
              setColumn={columnSettings.setColumnThree}
            />
            <OptionColumn
              columns={columns}
              column={columnSettings.columnFour}
              id="column_four"
              ReactSelectStyleSm={ReactSelectStyleSm}
              setColumn={columnSettings.setColumnFour}
            />

            {channelName ? null : (
              <OptionColumn
                columns={columns}
                column={columnSettings.columnFive}
                id="column_five"
                ReactSelectStyleSm={ReactSelectStyleSm}
                setColumn={columnSettings.setColumnFive}
              />
            )}
            <OptionColumn
              columns={columns}
              column={columnSettings.columnSix}
              id="column_six"
              ReactSelectStyleSm={ReactSelectStyleSm}
              setColumn={columnSettings.setColumnSix}
            />
            {channelName ? null : (
              <OptionColumn
                columns={columns}
                column={columnSettings.columnSeven}
                id="column_seven"
                ReactSelectStyleSm={ReactSelectStyleSm}
                setColumn={columnSettings.setColumnSeven}
              />
            )}
            <div className="rounded-md flex items-center justify-start">
              POSTED
            </div>
            {channelName ? null : (
              <div className="rounded-md flex items-center justify-start">
                Votes
              </div>
            )}
          </div>
          <div
            className={`overflow-y-scroll overflow-scroller ${
              channelName ? "h-auto" : "h-[70vh]"
            }`}
          >
            {listItems && listItems.length !== 0 &&
              listItems.map((listItem, index) => {
                const {
                  _id,
                  chain,
                  token,
                  posted,
                  upvote_status,
                  downvote_status,
                  votes,
                } = listItem;

                return (
                  <div
                    key={_id}
                    className="grid grid-flow-col auto-cols-fr py-3 gap-6 text-[15px] cursor-pointer hover:bg-[#191c32] transition-all px-2"
                    onClick={(e) => {
                      e.preventDefault();
                      openInDexscreener(listItem, chainFilter);
                    }}
                  >
                    <div className="rounded-md flex items-center justify-start">
                      {chain}
                    </div>
                    <div className="rounded-md flex items-center justify-start overflow-hidden">
                      {token}
                    </div>
                    {channelName
                      ? null
                      : generateTableData(listItem, columnSettings.columnOne.value)}
                    {channelName
                      ? null
                      : generateTableData(listItem, columnSettings.columnTwo.value)}
                    {generateTableData(listItem, columnSettings.columnThree.value)}
                    {generateTableData(listItem, columnSettings.columnFour.value)}
                    {channelName
                      ? null
                      : generateTableData(listItem, columnSettings.columnFive.value)}

                    {generateTableData(listItem, columnSettings.columnSix.value)}
                    {channelName
                      ? null
                      : generateTableData(listItem, columnSettings.columnSeven.value)}
                    <div className="rounded-md flex items-center justify-start">
                      {posted}
                    </div>

                    {channelName ? null : (
                      <div
                        className="rounded-md flex items-center justify-between gap-2"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <div className="">{votes}</div>
                        <div className="shrink-0 flex items-center flex-row">
                          <VoteButton isUpvote={true} status={upvote_status} vote={()=>{}} />
                          <VoteButton isUpvote={false} status={downvote_status} vote={()=>{}} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            {/*(!whitelisted || !user || user.access_level < 1) && (
              <AccessDenied
                header="Not Subscribed"
                message="Please purchase a subscription from the sidebar in order to access this page."
              ></AccessDenied>
            )*/}
          </div>
    </div>
  );
};

export default DesktopTable;

interface ColumnSettings {
  columnOne: Column;
  columnTwo: Column;
  columnThree: Column;
  columnFour: Column;
  columnFive: Column;
  columnSix: Column;
  columnSeven: Column;
  setColumnOne: (column: Column) => void;
  setColumnTwo: (column: Column) => void;
  setColumnThree: (column: Column) => void;
  setColumnFour: (column: Column) => void;
  setColumnFive: (column: Column) => void;
  setColumnSix: (column: Column) => void;
  setColumnSeven: (column: Column) => void;
}

interface DesktopTableProps {
  listItems: ListItem[];
  columnSettings: ColumnSettings;
  chainFilter: string;
  channelName?: string;
}
