import React from 'react'
import Header from '../components/header'
import About from '../components/community/About'
import PostForm from '../components/new/PostForm'
import Head from 'next/head'

const NewPost = () => {
  return (
    <>
      <Head>
        <title>VALORANT | Create a post</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex min-h-screen flex-col bg-black text-[#d7dadc]">
        <Header />
        <main className="flex flex-1 w-full max-w-5xl px-6 mx-auto mt-16 space-x-6">
          <div className="w-full lg:w-2/3">
            <PostForm />
          </div>
          <div className="hidden w-1/3 lg:block">
            <About />
          </div>
        </main>
      </div>
    </>
  )
}

export default NewPost
