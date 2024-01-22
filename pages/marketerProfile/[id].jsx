import axios from "axios";
import { withIronSession } from "next-iron-session";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AccessDenied from "../../components/AccessDenied";
import AuthModal from "../../components/Auth/auth-modal";
import { CallsTable } from "../../components/marketerProfile/callsTable";
import { MultiplierGraph } from "../../components/marketerProfile/multiplierGraph";
import { Navbar } from "../../components/marketerProfile/navbar";
import { ProfileOverview } from "../../components/marketerProfile/profileOverview";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import Spinner from "../../components/spinner";
import Footer from "../../components/Footer";
import { calculateTimePosted } from "../../lib/parsers";
import MarketerBackground from "../../public/marketer-bg.svg";
import { createPagesBrowserClient, createPagesServerClient } from '@supabase/auth-helpers-nextjs'

function IsLessThanaWeekOld(count_str) {
  const count = count_str.split(" ")[0];
  const timeFrame = count_str.split(" ")[1];
  if (timeFrame === 'days') {
    if (parseInt(count) <= 7) {
      return true;
    }  
  } else {
    return true;
  }
  return false;
}

const MarketerProfile = ({ channelID, session }) => {
  const [marketerData, setMarketerData] = useState(null);
  const [posts_per_week, setPostsPerWeek] = useState("0");
  const [follow_status, setFollowStatus] = useState(false);
  const [address, setAddress] = useState("");
  // const [peak_multiplier, setPeakMultiplier] = useState(true);
  const [loading_status, setLoadingStatus] = useState(false);
  const user = session?.user || null
  const supabase = createPagesBrowserClient()

  useEffect(
    () => {
      if (user !== undefined) {
        //if (user.access_level < 2) return;
      }
      axios
        .get(`/api/marketer-info?channel_id=${channelID}`)
        .then((option) => {
          if (option.data.success === true) {
            setFollowStatus(option.data.marketerData.followed);
            setMarketerData(option.data.marketerData);
          } else {
            // any alternative operation
          }
        })
        .catch(() => {});
    }, // eslint-disable-next-line
    []
  );

  const ChangeFollowStatus = () => {
    //if (user.access_level >= 3) {
      let dummy = { ...marketerData };
      let newData = parseInt(dummy.followers) - 1;
      if (follow_status) {
        dummy.followers = newData.toString();
        if (loading_status === false) {
          setLoadingStatus(true);
          axios
            .delete("/api/marketers/follow", {
              id: marketerData.id,
              channel_id: marketerData.channel_id,
            })
            .then(() => {
              setLoadingStatus(false);
            });
        }
      } /*else {
        newData = parseInt(dummy.followers) + 1;
        dummy.followers = newData.toString();
        if (loading_status === false) {
          setLoadingStatus(true);
          axios
            .post("/api/marketers/follow", {
              channel_id: marketerData.channel_id,
            })
            .then(() => {
              setLoadingStatus(false);
            });
        }
      }*/
      setMarketerData(dummy);
      setFollowStatus(!follow_status);
    }

  const GetTableData = (data) => {
    if (data.length > 0 && user && typeof data !== "string") {
      if (user.access_level >= 2) {
        const parsedData = data.filter((item) => {
          // here id is postTimeinms
          const TimePosted = calculateTimePosted(item.id);
          console.log(TimePosted);
          const condition = IsLessThanaWeekOld(TimePosted);
          return condition;
        });
        setPostsPerWeek(parsedData.length);
      }
    }
  };

  console.log("Marketer Data:")
  console.log(marketerData)

  return (
    <div className="bg-[#090A11] relative flex flex-col pb-10 w-[100%]">
      <Head>
        <title>Marketer Profile</title>
        <link rel="icon" href="/apollo.png" />
      </Head>
      {typeof session == "undefined" && (
        <AuthModal></AuthModal>
      )}
      {marketerData ? (
        <Sidebar
          key={process.env.API_KEY}
          address={address}
          setAddress={setAddress}
          user={user}
        />
      ) : null}
      {/*{(user && user.access_level < 2) ? (
        <AccessDenied
          header="Subscription Required"
          message="Please subscribe to Tier 2 to get this service."
          className="absolute flex top-0 left-0 items-center justify-center w-full h-full z-20 backdrop-blur-lg rounded-[25px] mt-2"
        ></AccessDenied>
      ) : null}*/}
      {/* <Navbar /> */}
      <Nav blur={true} user={user} isoverlay={false}/>
      {/* { peak_multiplier === false ? <Disclaimer/> : null } */}
      {marketerData ? (
        <main className="flex flex-col items-center mt-[70px] lg:mt-0 lg:flex-row lg:px-[6%] lg:items-start lg:justify-between">
          <ProfileOverview
            TelegramName={marketerData.channel_name}
            telegramLink={marketerData.channel_link}
            PostsPerWeek={posts_per_week}
            Followers={marketerData.followers}
            TotalBurnt={"155M"}
            TotalHoldings={"120K"}
            ChangeFollowStatus={ChangeFollowStatus}
            follow_status={follow_status}
          />
          <section className="flex flex-col justify-center items-center w-[92%] lg:w-[60%] relative">
            {/*
            {user.access_level < 2 ? (
              <AccessDenied
                header="Subscription Required"
                message="Please subscribe to Tier 2 to get this service."
                className="absolute flex top-0 left-0 items-center justify-center w-full h-full z-30 backdrop-blur-lg rounded-[25px] mt-2"
              ></AccessDenied>
            ) : null}
            */}
            <MultiplierGraph />
            {/*
            {user.access_level < 2 ? (
              <CallsTable
                channelID={marketerData.channel_name}
                callback={GetTableData}
                access_level={0}
              />
            ) : (
              <CallsTable
                channelID={marketerData.channel_name}
                callback={GetTableData}
                access_level={user.access_level}
              />
            )}
            */}
          <CallsTable
            channelID={marketerData.channel_name}
            callback={GetTableData}
            access_level={0}
            session={session}
          />
          </section>
        </main>
      ) : (
        <main className="flex items-center mt-[70px] lg:mt-0 justify-center h-screen w-full">
          <Spinner />
        </main>
      )}
      <Footer /> 
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const { id } = query;
  const supabase = createPagesServerClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()


  if (session) {
    console.log("User found")
    const user = await supabase.from("users").select("*").eq("id", session.user.id).single()
    return {
      props: {
        session: {
          ...session
        },
        channelID: id
      }
    }
  } else {
    console.log("User not found")
    return {
      props: {}
    }
  }
}

export default MarketerProfile;