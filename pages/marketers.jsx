import { useState, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import MarketerHero from '../components/MarketerHero'
import Sidebar from '../components/Sidebar'
import { Footer } from '../components'
import MarketerList from '../components/MarketerList'
import AccessDenied from "../components/AccessDenied";
import AuthModal from "../components/Auth/auth-modal";
import { createPagesBrowserClient, createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export default function Marketers({session}) {
    const [address, setAddress] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [marketers, setMarketers] = useState([])
    const user = session?.user || null
    const supabase = createPagesBrowserClient()

    const marketerSearch = async () => { 
        if(!user) {
            return;
        }
        const { data, error } = await supabase.from("marketer_data").select("*").like("channel_name", `%${searchQuery}%`)
        console.log(data)
        console.log(error)
        setMarketers(data) 
    }

    useEffect(() => { 
        marketerSearch()
    }, // eslint-disable-next-line  
    [searchQuery])

    return ( 
        <div className="App min-w-screen min-h-screen font-sans bg-[#090A11]"> 
            <Head>
                <title>Apollo</title>
                <link rel="icon" href="/apollo.png" />
            </Head>
            {typeof session == "undefined" && (
              <AuthModal></AuthModal>
            )}
            <div className="hero-wrapper">
                <Nav/>
                <MarketerHero setSearchQuery={setSearchQuery}/>
            </div>
            <Sidebar key={process.env.API_KEY} address={address} setAddress={setAddress} user={user}/>

            <div className="wrapper min-h-[80vh] pt-2"> 
            {/*
                {(user && user.access_level >= 3) ?
                    <MarketerList marketers={marketers}/>:
                    <AccessDenied
                    header="Subscription Required"
                    message="Please subscribe to Tier 3 to get this service."
                    ></AccessDenied>
                }
            */}

                {user ?
                  <MarketerList marketers={marketers}/>:
                  <AccessDenied
                    header="Subscription Required"
                    message="Please subscribe to Tier 3 to get this service."
                  ></AccessDenied>
                }
                <Footer /> 
            </div>
        </div>
    )
}
  
export const getServerSideProps = async ({ req, res }) => {
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
          }
        }
      }
    } else {
      console.log("User not found")
      return {
        props: {}
      }
    }
  }