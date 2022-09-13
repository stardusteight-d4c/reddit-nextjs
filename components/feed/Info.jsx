/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const style = {
  profilePic: 'w-4 h-4 rounded-full',
  wrapper: 'flex item-center space-x-1 text-xs text-[#818384]',
  profilePicContainer: 'flex items-center space-x-1',
  tag: 'cursor-pointer text-xs font-semibold text-[#d7dadc] hover:underline',
  postedBy: 'flex items-center space-x-1',
}

const Info = ({ author, avatar, created_at }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.profilePicContainer}>
        <img className={style.profilePic} src={avatar} />
      </div>
      <div className={style.tag}>r/VALORANT</div>
      <div>•</div>
      <div className={style.postedBy}>
        <span>Posted by {author}</span>
        <span>•</span>
        <span>{timeAgo.format(new Date(created_at), 'twitter-now')}</span>
      </div>
    </div>
  )
}

export default Info
