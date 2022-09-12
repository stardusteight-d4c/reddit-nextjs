import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { RedditContext } from '../../context/RedditContext'
import { useRouter } from 'next/router'

import Vote from '../feed/Vote'
import Actions from '../feed/Actions'
import Info from '../feed/Info'
import useSWR from 'swr';

const style = {
  post: 'flex flex-col space-y-1 cursor-pointer',
  wrapper: 'flex space-x-3 rounded bg-[#1a1a1b]/80 p-2 border border-[#343536]',
  postTitle: 'text-lg font-medium text-[#d7dadc]',
  postContent: 'text-sm font-light text-[#d7dadc]/80',
}

const Post = ({ id, author, avatar, title, content, upvotes, downvotes, created_at }) => {
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { fetcher } = useContext(RedditContext)
  const { setSelectedPost } = useContext(RedditContext)

  const { data } = useSWR(`/api/get-comments?postId=${id}`, fetcher, {
    refreshInterval: 200,
  })

  useEffect(() => {
    if (!data) return
    setComments(data.data)
  }, [data])

  const navigateToPost = () => {
    setSelectedPost({
      id,
      title,
      content,
      author,
      avatar,
      created_at,
      upvotes,
      downvotes,
    })

    router.push(`/post/${id}`)
  }

  return (
    <div className={style.wrapper}>
      <Vote upvotes={upvotes} downvotes={downvotes} />
      <div className={style.post} onClick={navigateToPost}>
        <Info author={author} avatar={avatar} created_at={created_at} />
        <h1 className={style.postTitle}>{title}</h1>
        <p className={style.postContent}>{content}</p>
        <Actions comments={comments} />
      </div>
    </div>
  )
}

export default Post
