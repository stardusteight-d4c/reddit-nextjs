import { useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { RedditContext } from '../context/RedditContext'
import { supabase } from '../services/supabaseClient'

import Header from '../components/header'
import CreatePost from '../components/feed/CreatePost'
import Feed from '../components/feed'
import Banner from '../components/community/Banner'
import About from '../components/community/About'
import Login from '../components/Login'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


const style = {
  wrapper: `flex min-h-screen flex-col bg-black text-white`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6`,
  content: `w-full space-y-4 lg:w-2/3`,
  infoContainer: `hidden w-1/3 lg:block`,
}

const Home: NextPage = () => {
  const { currentUser, fetcher } = useContext(RedditContext)
  const [myPosts, setMyPosts] = useState([])
  
  const { data, error } = useSWR('/api/get-posts', fetcher, {
    refreshInterval: 200,
  })

  useEffect(() => {
    if (!data) return
    setMyPosts(data.data)
  }, [data])

  useEffect(() => {
    // update or insert a new user
    if (!currentUser) return

    const saveAndUpdateUser = async () => {
      await supabase.from('users').upsert(
        {
          name: currentUser.user_metadata.full_name,
          email: currentUser.user_metadata.email,
          avatar: currentUser.user_metadata.avatar_url,
        },
        {
          onConflict: 'email',
        }
      )
    }
    saveAndUpdateUser()
  }, [currentUser])

  // console.log(myPosts)

  return (
    <>
      <Head>
        <title>VALORANT</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {currentUser ? (
        <div className={style.wrapper}>
          <Header />
          <Banner />
          <main className={style.main}>
            <div className={style.content}>
              <CreatePost />
              <Feed posts={myPosts} />
            </div>
            <div className={style.infoContainer}>
              <About />
            </div>
          </main>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default Home
