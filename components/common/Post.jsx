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

const Post = ({ id, author, title, content, upvotes, downvotes }) => {
  return (
    <div className={style.wrapper}>
      <Vote upvotes={upvotes} downvotes={downvotes} />
      <div className={style.post}>
        <Info author={author} />
        <h1 className={style.postTitle}>{title}</h1>
        <p className={style.postContent}>
          {content}
        </p>
        <Actions />
      </div>
    </div>
  )
}

export default Post
