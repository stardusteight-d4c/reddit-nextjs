import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { RedditContext } from '../../context/RedditContext'
import { UpvoteIcon } from '../common/UpvoteIcon'
import { DownvoteIcon } from '../common/DownvoteIcon'
import { ChatAltIcon } from '@heroicons/react/outline'

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
    postInfoContainer: 'flex items-center gap-[.4rem]',
    icon: 'text-[#818384]',
    icons: 'flex gap-[.4rem]',
    commentContainer: 'my-[1rem] flex flex-col gap-[1rem]',
    wrapper: 'bg-[#1a1a1a] p-4',
    reply: 'flex items-center gap-[.2rem] text-[#818384]',
    infoPostedTimeago: 'text-sm text-[#818384]',
  }

  return (
    <>
      <div className={style.wrapper}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={style.commentContainer}>
              <div className={style.postInfoContainer}>
                <div className={style.avatarContainer}>
                  <Image
                    src={comment.users.avatar}
                    className={style.avatar}
                    layout="fill"
                    alt="user/img"
                  />
                </div>
                <span>{comment.user}</span>
                <span className={style.infoPostedTimeago}>
                  <span>•</span>{' '}
                  {timeAgo.format(new Date(comment.created_at), 'twitter-now')}{' '}
                  ago
                </span>
              </div>
              <div>{comment.comment}</div>
              <div className={style.icons}>
                <span className={style.icon}>
                  <UpvoteIcon />
                </span>
                <span>0</span>
                <span className={style.icon}>
                  <DownvoteIcon />
                </span>
                <span className={style.reply}>
                  <ChatAltIcon className="w-6 h-6" />
                  <span>Reply</span>
                </span>
                <span className={style.icon}>Give</span>
                <span className={style.icon}>Share</span>
                <span className={style.icon}>Save</span>
                <span className={style.icon}>Follow</span>
              </div>
            </div>
          )) ): (
            <div>
              <h3>There are no comments</h3>
            </div>
          )}
      </div>
    </>
  )
}

export default Comments
