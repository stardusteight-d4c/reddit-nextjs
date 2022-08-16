import React from 'react'
import Vote from '../feed/Vote';
import Actions from '../feed/Actions';
import Info from '../feed/Info';

const style = {
  post: 'flex flex-col space-y-1 cursor-pointer',
  wrapper: 'flex space-x-3 rounded bg-[#1a1a1b]/80 p-2 border border-[#343536]',
  postTitle: 'text-lg font-medium text-[#d7dadc]',
  postContent: 'text-sm font-light text-[#d7dadc]/80',
}

const Post = ({ id, title, author }) => {
  return (
    <div className={style.wrapper}>
      <Vote />
      <div className={style.post}>
        <Info author={author} />
        <h1 className={style.postTitle}>{title}</h1>
        <p className={style.postContent}>
          I want to make sage look more sassy and glamorous on this one, and
          make her look really confident, xD i learned alot on this piece, and
          my brain hurts on all the lighting i tried, maybe next time ill try to
          focus on just a single main light, cause it ended up a bit hard to
          read but thats all. hope you all enjoy this fanart (repost)
        </p>
        <Actions />
      </div>
    </div>
  )
}

export default Post
