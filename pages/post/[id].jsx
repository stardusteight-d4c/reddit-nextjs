import React, { useEffect } from 'react'
import Post from '../../components/common/Post'
import { useContext } from 'react'
import { RedditContext } from '../../context/RedditContext'
import Header from '../../components/header'
import { useRouter } from 'next/router'
import Comments from '../../components/commentsSection/Comments'
import SaveComment from '../../components/commentsSection/SaveComment'

const style = {
  wrapper: 'flex min-h-screen flex-col bg-black text-white',
  container: 'mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-[5rem] px-6',
  containerWrapper: 'w-full space-y-4 lg:w-2/3',
}

const PostView = () => {
  const router = useRouter()
  const { selectedPost } = useContext(RedditContext)

  useEffect(() => {
    if (selectedPost === null) {
      router.push('/')
    }
  }, [router, selectedPost])

  // console.log(selectedPost)

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.container}>
        <div className={style.containerWrapper}>
          <Post {...selectedPost} />
          <SaveComment postId={selectedPost?.id} />
          <Comments postId={selectedPost?.id} />
        </div>
      </div>
    </div>
  )
}

export default PostView
