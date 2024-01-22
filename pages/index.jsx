import { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import { AboutUs, Features, Footer, LatestTokenCalls, RoadMap, TokenCalls, QuickStart } from '../components'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export default function Home({ user }) {
  const [address, setAddress] = useState("")
  return (
    <div className="App min-w-screen min-h-screen bg font-sans">
      <Head>
        <title>Apollo</title>
        <link rel="icon" href="/apollo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />
      </Head>
      <div className="hero-wrapper">
        <Nav user={user} />
        <Hero />
      </div>
      <Sidebar key={process.env.API_KEY} address={address} setAddress={setAddress} user={user} />

      <div className="wrapper">
        <AboutUs />
        <TokenCalls />
        <Features />
        <RoadMap />
        <LatestTokenCalls />
        <QuickStart />
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
    return {
      props: { session }
    }
  } else {
    console.log("User not found")
    return {
      props: {}
    }
  }
}