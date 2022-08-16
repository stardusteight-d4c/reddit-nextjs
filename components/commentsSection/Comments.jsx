import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { RedditContext } from '../../context/RedditContext'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  const { fetcher } = useContext(RedditContext)

  const { data } = useSWR(`/api/get-comments?postId=${postId}`, fetcher, {
    refreshInterval: 200,
  })

  useEffect(() => {
    if (!data) return
    setComments(data.data)
  }, [data])

  const style = {
    avatar: 'object-cover',
    avatarContainer:
      'w-[1.2rem] h-[1.2rem] overflow-hidden rounded-full relative',
    postInfoContainer: 'flex gap-[.4rem]',
  }

  return (
    <div>
      <h1>Comments</h1>
      {comments &&
        comments.map((comment, index) => (
          <div key={index} className={style.postInfoContainer}>
            <div className={style.avatarContainer}>
              <Image
                src={comment.users.avatar}
                className={style.avatar}
                layout="fill"
                alt="user/img"
              />
            </div>
            <span>{comment.author}</span>
            <span>•</span>
            <span>{timeAgo.format(new Date(comment.created_at), 'twitter-now')} ago</span>
            <div>{comment.comment}</div>
            <div className={style.icons}></div>
          </div>
        ))}
    </div>
  )
}

export default Comments
